import { CompanyFactsSchema } from '@money-meets-value/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { zodFetch } from '../zod-fetch';

@Injectable()
export class EdgarService {
  constructor(private prisma: PrismaService) {}

  async getHoldings() {
    return this.prisma.stock.findMany();
  }

  async extractSymbol(symbol: string) {
    const data = await zodFetch(
      'https://data.sec.gov/api/xbrl/companyfacts/CIK0000320193.json',
      CompanyFactsSchema,
    );

    return data;
  }
}
