import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EdgarService {
  constructor(private prisma: PrismaService) {}

  async getHoldings() {
    return this.prisma.stock.findMany();
  }

  async extractSymbol(symbol: string) {}
}
