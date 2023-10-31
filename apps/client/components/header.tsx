import React from 'react';
import { Logo } from './logo';
import { Navbar } from './navbar';
import { SearchButton } from './search/search-button';

export const Header: React.FC = async () => {
  return (
    <div className="border-accent flex items-center justify-between border-b-2 p-3">
      <Logo />
      <Navbar />
      <SearchButton modalId="search-modal" />
    </div>
  );
};
