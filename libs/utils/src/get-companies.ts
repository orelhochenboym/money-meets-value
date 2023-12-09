import { fromZodError } from 'zod-validation-error';
import {
  CompanyTickersExchange,
  CompanyTickersExchangeSchema,
} from '../../types/src';

export const getCompanies = async () => {
  const companies: CompanyTickersExchange = await fetch(
    'https://www.sec.gov/files/company_tickers_exchange.json',
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
