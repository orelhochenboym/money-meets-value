import { SignedIn, SignedOut, currentUser } from '@clerk/nextjs';
import { getCompanies } from '@money-meets-value/utils';
import React from 'react';
import { AuthButton } from './auth/auth/auth-button';
import { AuthModal } from './auth/auth/auth-modal';
import { ProfilePopover } from './auth/profile/profile-popover';
import { Logo } from './logo';
import { Navbar } from './navbar';
import { SearchButton } from './search/search-button';
import SearchModal from './search/search-modal';

export const Header: React.FC = async () => {
  const searchModalId = 'search-modal';
  const authModalId = 'auth-modal';
  const companies = await getCompanies();

  const user = await currentUser();

  return (
    <div className="border-accent flex w-full items-center justify-center border-b-2 p-3">
      <div className="flex w-1/3 items-center justify-start">
        <Logo />
      </div>
      <div className="flex w-1/3 items-center justify-center">
        <Navbar />
      </div>
      <div className="flex w-1/3 items-center justify-end gap-4">
        <SearchButton modalId={searchModalId} />
        <SearchModal id={searchModalId} stockMarket={companies} />
        <SignedOut>
          <AuthButton modalId={authModalId} />
        </SignedOut>
        <SignedIn>
          <ProfilePopover user={JSON.parse(JSON.stringify(user))} />
        </SignedIn>
        <AuthModal id={authModalId} />
      </div>
    </div>
  );
};
