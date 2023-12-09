import { SignedIn, SignedOut, currentUser } from '@clerk/nextjs';
import { getCompanies } from '@money-meets-value/utils';
import React from 'react';
import { AuthButton } from './auth/auth-button';
import { AuthModal } from './auth/auth-modal';
import { Logo } from './logo';
import { Navbar } from './navbar';
import { SearchButton } from './search/search-button';
import SearchModal from './search/search-modal';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Header: React.FC = async () => {
  const searchModalId = 'search-modal';
  const authModalId = 'auth-modal';
  const companies = await getCompanies();

  const user = await currentUser();
  return (
    <div className="border-accent flex w-full items-center justify-between border-b-2 p-3">
      <Logo />
      <Navbar />
      <SearchButton modalId={searchModalId} />
      <SearchModal id={searchModalId} stockMarket={companies} />
      <SignedOut>
        <AuthButton modalId={authModalId} />
      </SignedOut>
      <SignedIn>
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{`${user?.firstName?.at(0)}${user?.lastName?.at(
            0,
          )}`}</AvatarFallback>
        </Avatar>
      </SignedIn>
      <AuthModal id={authModalId} />
    </div>
  );
};
