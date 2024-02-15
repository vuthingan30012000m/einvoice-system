import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxOffice } from './entities/tax-office.entity';

@Injectable()
export class TaxOfficeSeeder implements OnModuleInit {
  private logger = new Logger(TaxOfficeSeeder.name);

  constructor(
    @InjectRepository(TaxOffice)
    private readonly TaxOfficeRepository: Repository<TaxOffice>,
  ) {}

  async onModuleInit() {
    // const createTaxOfficeDto={name:"TaxOffice1"}
    // const newTaxOffice = this.TaxOfficeRepository.create( createTaxOfficeDto)
    // await this.TaxOfficeRepository.save(newTaxOffice);
    this.logger.log('Seeder successfully!');
  }
}
