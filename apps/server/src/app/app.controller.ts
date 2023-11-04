import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('quote/:cik')
  getQuote(@Param('cik') cik: string) {
    return this.appService.getQuote(cik);
  }

  @Get('chart/:cik')
  getChart(@Param('cik') cik: string) {
    return this.appService.getChart(cik);
  }
}
