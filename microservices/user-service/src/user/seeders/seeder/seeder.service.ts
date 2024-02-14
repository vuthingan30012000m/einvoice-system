import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { CoQuanThue } from 'src/tra-cuu-ma-so-thue/entities/co-quan-thue.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(CoQuanThue)
    private coQuanThueRepository: Repository<CoQuanThue>,
  ) {}
  // Seeder để tự động tạo và điền dữ liệu vào cơ sở dữ liệu.
  // Sử dụng kỹ thuật Seeder cho dữ liệu ban đầu của cơ sở dữ liệu.
  async onModuleInit() {
    console.log('Ứng dụng bắt đầu khởi động');
    console.log('Tạo dữ liệu mặc định CoQuanThue');

    const jsonFilePath = path.join(__dirname, 'co_quan_thue.json');
    const dataValue = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    const createCoQuanThueDtoArray = dataValue.map((item) => ({
      MaCoQuanThue: parseInt(item.id),
      TenCoQuanThue: item.name,
    }));

    await this.coQuanThueRepository.save(createCoQuanThueDtoArray);
  }
}
