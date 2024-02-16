import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoQuanThue } from 'src/tra-cuu-ma-so-thue/entities/co-quan-thue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoQuanThue])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
