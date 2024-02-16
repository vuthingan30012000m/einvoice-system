import { Module } from '@nestjs/common';
import { TraCuuMaSoThueService } from './tra-cuu-ma-so-thue.service';
import { TraCuuMaSoThueController } from './tra-cuu-ma-so-thue.controller';

@Module({
  controllers: [TraCuuMaSoThueController],
  providers: [TraCuuMaSoThueService],
})
export class TraCuuMaSoThueModule {}
