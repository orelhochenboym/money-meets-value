import React from 'react';
import { Logo } from './logo';
import { Navbar } from './navbar';
import { Searchbar } from './searchbar';
import {
  CompanyTickersExchange,
  CompanyTickersExchangeSchema,
} from '@money-meets-value/types';
import { fromZodError } from 'zod-validation-error';

const getCompanies = async () => {
  const companies: CompanyTickersExchange = await fetch(
    'https://www.sec.gov/files/company_tickers_exchange.json',
    { cache: 'no-cache' },
  ).then((res) => res.json());

  const results = CompanyTickersExchangeSchema.safeParse(companies);

  if (!results.success) {
    // TODO: toast
    console.log(fromZodError(results.error));
  }

  return companies.data
    .map((company) =>
      company
        .map((data, i) => {
          return { [companies.fields[i]]: data };
        })
        .reduce((acc, curr) => {
          acc[Object.keys(curr)[0]] = Object.values(curr)[0];
          return acc;
        }, {}),
    )
    .filter(
      (company, index, self) =>
        Object.keys(company).length === companies.fields.length &&
        index ===
          self.findIndex(
            (t) => Object.values(t)[0] === Object.values(company)[0],
          ),
    );
};

export const Header: React.FC = async () => {
  const companies = await getCompanies();

  return (
    <div className="flex items-center justify-between">
      <Logo />
      <Navbar />
      <Searchbar companies={companies} />
    </div>
  );
};
