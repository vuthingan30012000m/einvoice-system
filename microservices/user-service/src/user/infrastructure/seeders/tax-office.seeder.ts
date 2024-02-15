import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxOffice } from './entities/tax-office.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TaxOfficeSeeder implements OnModuleInit {
  private logger = new Logger(TaxOfficeSeeder.name);

  constructor(
    @InjectRepository(TaxOffice)
    private readonly taxOfficeRepository: Repository<TaxOffice>,
  ) {}

  async onModuleInit() {
    try {
      const jsonFilePath = path.join(__dirname, 'tax-offices.json');
      const rawData = fs.readFileSync(jsonFilePath, 'utf8');

      const data: { id: number; name: string }[] = JSON.parse(rawData);

      for (const item of data) {
        const taxOffice = new TaxOffice();
        taxOffice.id = item.id;
        taxOffice.name = item.name;
        await this.taxOfficeRepository.save(taxOffice);
      }
      this.logger.log('Seeder successfully!');
    } catch (error) {
      this.logger.error('Error seeding data:', error);
    }
  }
}
