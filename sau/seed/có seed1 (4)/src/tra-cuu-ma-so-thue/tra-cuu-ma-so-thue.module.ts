import { Module } from '@nestjs/common';
import { TraCuuMaSoThueService } from './tra-cuu-ma-so-thue.service';
import { TraCuuMaSoThueController } from './tra-cuu-ma-so-thue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoQuanThue } from './entities/co-quan-thue.entity';
import { NguoiNopThue } from './entities/nguoi-nop-thue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoQuanThue]),
    TypeOrmModule.forFeature([NguoiNopThue]),
  ],
  controllers: [TraCuuMaSoThueController],
  providers: [TraCuuMaSoThueService],
})
export class TraCuuMaSoThueModule {}
