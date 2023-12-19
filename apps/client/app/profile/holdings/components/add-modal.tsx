'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SearchResult } from 'yahoo-finance2/dist/esm/src/modules/search';
import { searchSymbol } from '../../../../components/search/actions';
import { Button } from '../../../../components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../../../components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../components/ui/popover';
import {
  HoldingsInsertSchema,
  HoldingsInsertType,
} from '../../../../db/schema/holdings';
import { cn } from '../../../../lib/utils';
import { submitForm } from './submit-form.action';
import { quoteSummarySymbol } from './summary.action';

type Props = { userId: string };

export const AddModal = NiceModal.create<Props>(({ userId }) => {
  const modal = useModal();
  const closeModal = React.useCallback(() => {
    modal.hide();
  }, [modal]);

  const [search, setSearch] = React.useState('');
  const [chosenSymbol, setChosenSymbol] = React.useState('');
  const [companies, setCompanies] = React.useState<SearchResult>();
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const form = useForm<HoldingsInsertType>({
    resolver: zodResolver(HoldingsInsertSchema),
    defaultValues: { userId, cost: 0, quantity: 0 },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await searchSymbol(search);
      if (data) {
        setCompanies(data);
      }
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  React.useEffect(() => {
    const fetchSummary = async () => {
      if (chosenSymbol) {
        const data = await quoteSummarySymbol(chosenSymbol);
        if (data && data.quoteType) {
          form.setValue('stockId', data.quoteType.uuid);
        }

        // TODO: toast
      }
    };

    fetchSummary();
  }, [chosenSymbol, form]);

  return (
    <Dialog open={modal.visible} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a holding to your portfolio</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => submitForm(data))}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="stockId"
              render={({ field }) => {
                const company = companies?.quotes.find(
                  (company) =>
                    company.symbol === chosenSymbol.toUpperCase() ||
                    company.symbol === chosenSymbol.toLowerCase(),
                );
                return (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <Popover
                        open={popoverOpen}
                        onOpenChange={() => setPopoverOpen(!popoverOpen)}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between text-start',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {!company
                                ? 'Select symbol or company name'
                                : `${company.symbol} - ${company.longname}`}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          style={{
                            width: 'var(--radix-popover-trigger-width)',
                            maxHeight:
                              'var(--radix-popover-content-available-height)',
                          }}
                        >
                          <Command shouldFilter={false}>
                            <CommandInput
                              placeholder="Search symbol or company name"
                              value={search}
                              onValueChange={(e) => setSearch(e)}
                            />
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                              {companies?.quotes
                                .filter((quote) => {
                                  const EQUITY = 'EQUITY';
                                  return quote.quoteType === EQUITY;
                                })
                                .map((quote) => (
                                  <CommandItem
                                    value={quote.symbol}
                                    key={quote.symbol}
                                    onSelect={(value) => {
                                      setChosenSymbol(value);
                                      setPopoverOpen(false);
                                      console.log(form.getValues());
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        quote.symbol === chosenSymbol
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    <div className="inline-block w-[calc(100%)] overflow-hidden text-ellipsis whitespace-nowrap text-start">
                                      {`${quote.symbol} - ${quote.longname}`}
                                    </div>
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(value) =>
                        form.setValue(
                          'quantity',
                          parseFloat(value.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(value) =>
                        form.setValue('cost', parseFloat(value.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default" className="self-end">
              Add Holding
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
