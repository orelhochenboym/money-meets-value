import { User } from '@clerk/nextjs/dist/types/server';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = { user: User | null };

export const ProfileAvatar: React.FC<Props> = ({ user }) => {
  return (
    <Avatar className="hover:cursor-pointer">
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>N/A</AvatarFallback>
    </Avatar>
  );
};
