import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EdgarController } from './edgar.controller';
import { EdgarService } from './edgar.service';

@Module({
  imports: [PrismaModule],
  controllers: [EdgarController],
  providers: [EdgarService],
  exports: [],
})
export class EdgarModule {}
