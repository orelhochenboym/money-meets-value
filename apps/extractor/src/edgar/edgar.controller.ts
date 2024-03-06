import { Controller, Get, Post } from '@nestjs/common';
import { EdgarService } from './edgar.service';

@Controller('holdings')
export class EdgarController {
  constructor(private edgarService: EdgarService) {}

  @Get()
  async getHoldings() {
    return this.edgarService.getHoldings();
  }

  @Post()
  async extractSymbol(symbol: string) {
    return this.edgarService.extractSymbol(symbol);
  }
}
