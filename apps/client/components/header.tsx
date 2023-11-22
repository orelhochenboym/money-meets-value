import {
  CompanyTickersExchange,
  CompanyTickersExchangeSchema,
} from '@money-meets-value/types';
import React from 'react';
import { fromZodError } from 'zod-validation-error';
import { Logo } from './logo';
import { Navbar } from './navbar';
import { SearchButton } from './search/search-button';
import SearchModal from './search/search-modal';

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
