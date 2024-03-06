import { Module } from '@nestjs/common';
import { EdgarModule } from '../edgar/edgar.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, EdgarModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
