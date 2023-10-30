'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from '../ui/command';

export const SearchModal = NiceModal.create<PropsWithChildren>(
  ({ children }) => {
    const modal = useModal();
    const router = useRouter();
    const closeModalAndNavigateBack = React.useCallback(() => {
      router.back();
      modal.hide();
    }, [modal, router]);

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

    return (
      <CommandDialog
        open={modal.visible}
        onOpenChange={closeModalAndNavigateBack}
      >
        <CommandInput placeholder="Search ticker or CIK..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {children}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    );
  },
);

export default SearchModal;
