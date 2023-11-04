import React from 'react';
import { Logo } from './logo';
import { Navbar } from './navbar';
import { SearchButton } from './search/search-button';
import SearchModal from './search/search-modal';

export const Header: React.FC = async () => {
  const modalId = 'search-modal';
  return (
    <div className="border-accent flex items-center justify-between border-b-2 p-3">
      <Logo />
      <Navbar />
      <SearchButton modalId={modalId} />
      <SearchModal id={modalId} />
    </div>
  );
};
