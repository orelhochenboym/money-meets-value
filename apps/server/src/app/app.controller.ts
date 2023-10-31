import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':cik')
  getData(@Param('cik') cik: string) {
    return this.appService.getData(cik);
  }
}
