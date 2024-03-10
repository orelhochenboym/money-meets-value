import {
  CompanyFactsSchema,
  CompanyTickersExchangeSchema,
} from '@money-meets-value/types';
import { Injectable } from '@nestjs/common';
import { taxonomies } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { zodFetch } from '../zod-fetch';

@Injectable()
export class EdgarService {
  constructor(private prisma: PrismaService) {}

  async getStocksList() {
    const companies = await zodFetch(
      'https://www.sec.gov/files/company_tickers_exchange.json',
      CompanyTickersExchangeSchema,
    );

    const isDataValid = companies.data.every(
      (company) => company.length === companies.fields.length,
    );

    if (!isDataValid) {
      throw new Error('Inconsistent data structure');
    }

    const formattedCompanies = companies.data.map((company) => {
      const formattedCompany: Record<string, string | number | null> = {};
      companies.fields.forEach((field, i) => {
        const value = company[i];

        if (field === 'cik') {
          formattedCompany[field] = value && value.toString().padStart(10, '0');
        } else {
          formattedCompany[field] = value;
        }
      });

      return formattedCompany;
    });

    return formattedCompanies;
  }

  async getStock(symbol: string) {
    const stocks = await this.getStocksList();

    const foundStock = stocks.find((stock) => {
      return Object.values(stock).find((value) => {
        return value?.toString().toUpperCase() === symbol.toUpperCase();
      });
    });

    if (!foundStock) {
      throw new Error(`Couldn't find ${symbol} in the list of listed stocks`);
    }

    return foundStock;
  }

  async insertSymbolFacts(symbol: string) {
    const cik = Object.entries(await this.getStock(symbol)).find(([key]) => {
      return key === 'cik';
    });

    if (!cik || !cik[1]) {
      throw new Error(
        `Couldn't find ${symbol} corresponding cik, found ${cik?.toString()}`,
      );
    }

    // edgar API data
    const data = await zodFetch(
      `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik[1]}.json`,
      CompanyFactsSchema,
    );

    // find or create a stock in db
    const stock = await this.prisma.stocks.upsert({
      where: { symbol },
      create: { symbol },
      update: {},
    });

    // prepare data to insert into db
    const facts = Object.entries(data.facts)
      .map(([key, taxonomyFacts]) => {
        const facts = Object.entries(taxonomyFacts).map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([name, { units, ...fact }]) => {
            return {
              stock_id: stock.id,
              taxonomy:
                key === taxonomies.dei ? taxonomies.dei : taxonomies.us_gaap,
              name,
              ...fact,
            };
          },
        );

        return facts;
      })
      .reduce((acc, curr) => {
        return acc.concat(curr);
      });

    // find or create data in db
    const factsInDb = await Promise.all(
      facts.map(({ name, ...fact }) => {
        return this.prisma.facts.upsert({
          where: { name },
          create: { name, ...fact },
          update: {},
        });
      }),
    );

    return factsInDb;
  }
}
