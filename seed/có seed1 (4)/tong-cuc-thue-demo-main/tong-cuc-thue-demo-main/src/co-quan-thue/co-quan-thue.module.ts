import { Module } from '@nestjs/common';
import { CoQuanThueService } from './co-quan-thue.service';
// import { CoQuanThueController } from './co-quan-thue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoQuanThue } from './entities/co-quan-thue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoQuanThue])],
  // controllers: [CoQuanThueController],
  providers: [CoQuanThueService],
  // exports: [CoQuanThueService],
})
export class CoQuanThueModule {}
