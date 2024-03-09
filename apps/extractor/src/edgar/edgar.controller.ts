import { Controller, Get, Param, Post } from '@nestjs/common';
import { EdgarService } from './edgar.service';

@Controller('edgar')
export class EdgarController {
  constructor(private edgarService: EdgarService) {}

  @Get()
  async getHoldings() {
    return this.edgarService.getHoldings();
  }

  @Post('insert/facts/:symbol')
  async insertSymbolFacts(@Param('symbol') symbol: string) {
    return this.edgarService.insertSymbolFacts(symbol);
  }
}
