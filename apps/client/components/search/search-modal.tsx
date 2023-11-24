'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SearchResult } from 'yahoo-finance2/dist/esm/src/modules/search';
import { Badge } from '../ui/badge';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { searchSymbol } from './actions';

export const SearchModal = NiceModal.create<{
  stockMarket: {
    [x: string]: string | number | null;
  }[];
}>(({ stockMarket }) => {
  const modal = useModal();
  const router = useRouter();

  const closeModalAndNavigateBack = React.useCallback(() => {
    modal.hide();
  }, [modal]);

  const [search, setSearch] = React.useState('');
  const [companies, setCompanies] = React.useState<SearchResult>();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Slash') {
        e.preventDefault();
        closeModalAndNavigateBack();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [closeModalAndNavigateBack]);

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

  return (
    <CommandDialog
      open={modal.visible}
      onOpenChange={closeModalAndNavigateBack}
      shouldFilter={false}
    >
      <CommandInput
        placeholder="Search ticker or CIK..."
        value={search}
        onValueChange={(e) => setSearch(e)}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {companies?.quotes
          .filter((quote) => {
            const EQUITY = 'EQUITY';
            return quote.quoteType === EQUITY;
          })
          .map((quote) => {
            return (
              <CommandItem
                key={quote.symbol}
                onSelect={async (_) => {
                  const foundCompany =
                    stockMarket.find((stockMarketCompany) => {
                      return Object.values(stockMarketCompany).includes(
                        quote.symbol,
                      );
                    }) ?? {};

                  const cik = Object.values(foundCompany).find(
                    (value) => typeof value == 'number',
                  );
                  router.push(`/company/${cik?.toString().padStart(10, '0')}`);
                  modal.hide();
                }}
              >
                <div className="flex w-1/5 items-center justify-center">
                  {quote.symbol}
                </div>

                <div className="flex w-3/5 items-center justify-center">
                  {quote.longname}
                </div>

                <Badge
                  variant={quote.exchDisp ? 'outline' : 'destructive'}
                  className="flex w-1/5 items-center justify-center"
                >
                  {quote.exchDisp ?? 'N/A'}
                </Badge>
              </CommandItem>
            );
          })}
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  );
});

export default SearchModal;
