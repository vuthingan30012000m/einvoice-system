import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxOfficeEntity } from '../entities/tax-office.entity';
import { dataTaxOfficeEntity } from './data/tax-office.data';

@Injectable()
export class TaxOfficeEntitySeeder implements OnModuleInit {
  private logger = new Logger(TaxOfficeEntitySeeder.name);

  constructor(
    @InjectRepository(TaxOfficeEntity)
    private readonly TaxOfficeEntityRepository: Repository<TaxOfficeEntity>,
  ) {}

  async onModuleInit() {
    try {
      for (const item of dataTaxOfficeEntity) {
        const existingTaxOfficeEntity = await this.TaxOfficeEntityRepository.findOneBy({
          id: Number(item.id),
        });

        if (existingTaxOfficeEntity) {
          // await this.TaxOfficeEntityRepository.update(existingTaxOfficeEntity.id, {
          // name: item.name,
          // });
        } else {
          const newTaxOfficeEntity = this.TaxOfficeEntityRepository.create({
            id: Number(item.id),
            name: item.name,
          });
          await this.TaxOfficeEntityRepository.save(newTaxOfficeEntity);
        }
      }

      this.logger.log('Seeder successfully!');
    } catch (error) {
      this.logger.error('Error seeding data:', error);
    }
  }
}
