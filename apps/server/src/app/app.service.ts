import {
  CompanyTickersExchange,
  CompanyTickersExchangeSchema,
} from '@money-meets-value/types';
import { Injectable } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';
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

@Injectable()
export class AppService {
  async getQuote(cik: string) {
    const companies = await getCompanies();
    const relatedCompany = companies.find((company) => {
      for (const key in company) {
        if (company[key] !== Number(cik)) {
          continue;
        }
        return true;
      }
    });

    if (!relatedCompany) {
      throw new Error('No company found');
    }

    const ticker =
      relatedCompany[
        Object.keys(relatedCompany).find((key) => key === 'ticker') ?? ''
      ]?.toString() ?? '';

    const data = yahooFinance.quote(ticker);

    return data;
  }

  async getChart(cik: string) {
    const companies = await getCompanies();
    const relatedCompany = companies.find((company) => {
      for (const key in company) {
        if (company[key] !== Number(cik)) {
          continue;
        }
        return true;
      }
    });

    if (!relatedCompany) {
      throw new Error('No company found');
    }

    const ticker =
      relatedCompany[
        Object.keys(relatedCompany).find((key) => key === 'ticker') ?? ''
      ]?.toString() ?? '';

    const data = yahooFinance.chart(ticker, { period1: 1667236413 });

    return data;
  }

  async getSearch(symbol: string) {
    const data = yahooFinance.search(symbol);

    return data;
  }

  async getTrending() {
    // Unlimited count
    const data = yahooFinance.trendingSymbols('US', { count: 999999 });

    return data;
  }
}
