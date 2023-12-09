import { SignedIn, SignedOut } from '@clerk/nextjs';
import { getCompanies } from '@money-meets-value/utils';
import React from 'react';
import { AuthButton } from './auth/auth-button';
import { AuthModal } from './auth/auth-modal';
import { User } from './auth/user';
import { Logo } from './logo';
import { Navbar } from './navbar';
import { SearchButton } from './search/search-button';
import SearchModal from './search/search-modal';

export const Header: React.FC = async () => {
  const searchModalId = 'search-modal';
  const authModalId = 'auth-modal';
  const companies = await getCompanies();

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
        <User />
      </SignedIn>
      <AuthModal id={authModalId} />
    </div>
  );
};
