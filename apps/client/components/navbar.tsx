import React from 'react';
import { Logo } from './logo';

export const Navbar: React.FC = () => {
  return (
    <div className="flex border border-slate-500">
      <Logo />
    </div>
  );
};
