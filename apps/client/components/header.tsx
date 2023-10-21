'use client';

import React from 'react';
import { Logo } from './logo';
import { Navbar } from './navbar';

export const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <Logo />
      <Navbar />
    </div>
  );
};
