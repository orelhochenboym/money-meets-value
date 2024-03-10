import { Controller, Get, Param, Post } from '@nestjs/common';
import { EdgarService } from './edgar.service';

@Controller('edgar')
export class EdgarController {
  constructor(private edgarService: EdgarService) {}

  @Get('/stocks')
  async getStocksList() {
    return this.edgarService.getStocksList();
  }

  @Get('/stocks/:symbol')
  async getStockBySymbol(@Param('symbol') symbol: string) {
    return this.edgarService.getStock(symbol);
  }

  @Post('insert/facts/:symbol')
  async insertSymbolFacts(@Param('symbol') symbol: string) {
    return this.edgarService.insertSymbolFacts(symbol);
  }
}
