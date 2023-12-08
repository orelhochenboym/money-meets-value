import { getCompanies } from '@money-meets-value/utils';
import React from 'react';
import { Logo } from './logo';
import { Navbar } from './navbar';
import { SearchButton } from './search/search-button';
import SearchModal from './search/search-modal';

export const Header: React.FC = async () => {
  const modalId = 'search-modal';
  const companies = await getCompanies();

  return (
    <div className="border-accent flex w-full items-center justify-between border-b-2 p-3">
      <Logo />
      <Navbar />
      <SearchButton modalId={modalId} />
      <SearchModal id={modalId} stockMarket={companies} />
    </div>
  );
};
