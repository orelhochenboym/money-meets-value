'use client';

import { useModal } from '@ebay/nice-modal-react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CommandItem } from './ui/command';

export const ClientCommandItem = React.forwardRef<
  React.ElementRef<typeof Command.Item>,
  React.ComponentPropsWithoutRef<typeof Command.Item>
>(({ className, ...props }, ref) => {
  const modal = useModal('search-modal');
  const router = useRouter();

  return (
    <CommandItem
      ref={ref}
      className={className}
      {...props}
      onSelect={() => {
        router.replace(`company/${props.value}`);
        modal.hide();
      }}
    />
  );
});

ClientCommandItem.displayName =
  CommandItem.displayName ?? Command.Item.displayName;
