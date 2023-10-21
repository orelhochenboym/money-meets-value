'use client';

import * as React from 'react';
import { DialogProps } from '@radix-ui/react-alert-dialog';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { CompanyTickersExchange } from '@money-meets-value/types';
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';

export function Searchbar({
  ...props
}: DialogProps & {
  companies: { [x: string]: CompanyTickersExchange['data'][number][number] }[];
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Slash') {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'text-muted-foreground relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64',
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search ticker or CIK</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="bg-muted pointer-events-none absolute right-2.5 top-auto hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">/</span>
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search ticker or CIK..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {props.companies.map((company) => {
            const values = Object.values(company);

            return (
              <CommandItem
                key={values[0]}
                value={values[0]?.toString().padStart(10, '0')}
                className="flex cursor-pointer justify-between"
                onSelect={(cik) =>
                  runCommand(() => router.push(`company/${cik}`))
                }
              >
                <div className="flex w-[20%] items-center justify-center">
                  {values[2]}
                </div>

                <div className="flex w-[60%] items-center justify-center">
                  {values[1]}
                </div>

                <Badge
                  variant={values[3] ? 'outline' : 'destructive'}
                  className="flex w-[20%] items-center justify-center"
                >
                  {values[3] ? values[3].toString().toUpperCase() : 'N/A'}
                </Badge>
              </CommandItem>
            );
          })}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
