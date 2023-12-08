'use client';

import { useModal } from '@ebay/nice-modal-react';
import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

type Props = { modalId: string };

export const SearchButton: React.FC<Props> = ({ modalId }) => {
  const modal = useModal(modalId);
  const openModal = React.useCallback(() => {
    modal.show();
  }, [modal]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Slash') {
        e.preventDefault();
        openModal();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [openModal]);

  return (
    <Button
      variant="outline"
      className={cn(
        'text-muted-foreground relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64',
      )}
      onClick={openModal}
    >
      <span className="hidden lg:inline-flex">Search ticker or CIK</span>
      <span className="inline-flex lg:hidden">Search...</span>
      <kbd className="bg-muted pointer-events-none absolute right-2.5 top-auto hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">/</span>
      </kbd>
    </Button>
  );
};

export default SearchButton;
