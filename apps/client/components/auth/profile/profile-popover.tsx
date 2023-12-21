'use client';

import { SignOutButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { ProfileAvatar } from './profile-avatar';

type Props = { user: User | null };

export const ProfilePopover: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger onClick={() => setOpen(!open)}>
        <ProfileAvatar user={user} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center justify-center gap-4">
        <Link
          href="/profile"
          className="hover:bg-accent flex h-fit w-full items-baseline justify-start gap-4 p-2"
          onClick={() => setOpen(false)}
        >
          <UserRound className="aspect-square h-full self-end" />
          Profile
        </Link>
        <SignOutButton>
          <Button variant="destructive">Sign Out</Button>
        </SignOutButton>
      </PopoverContent>
    </Popover>
  );
};
