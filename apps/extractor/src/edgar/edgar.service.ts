import { CompanyFactsSchema } from '@money-meets-value/types';
import { Injectable } from '@nestjs/common';
import { taxonomies } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { zodFetch } from '../zod-fetch';

@Injectable()
export class EdgarService {
  constructor(private prisma: PrismaService) {}

  async getHoldings() {
    return this.prisma.stocks.findMany();
  }

  async insertSymbolFacts(symbol: string) {
    // edgar API data
    const data = await zodFetch(
      'https://data.sec.gov/api/xbrl/companyfacts/CIK0000320193.json',
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
