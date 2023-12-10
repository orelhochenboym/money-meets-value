'use client';

import { User } from '@clerk/nextjs/dist/types/server';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ProfileAvatar } from './profile-avatar';

type Props = { user: User | null };

export const ProfilePopover: React.FC<Props> = ({ user }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <ProfileAvatar user={user} />
      </PopoverTrigger>
      <PopoverContent>
        <div>Hello</div>
      </PopoverContent>
    </Popover>
  );
};
