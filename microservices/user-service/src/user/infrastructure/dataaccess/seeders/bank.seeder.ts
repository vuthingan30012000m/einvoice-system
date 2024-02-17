import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankEntity } from '../entities/bank.entity';
import { dataBank   } from './data/bank.data';

@Injectable()
export class BankEntitySeeder implements OnModuleInit {
  private logger = new Logger(BankEntitySeeder.name);

  constructor(
    @InjectRepository(BankEntity)
    private readonly BankEntityRepository: Repository<BankEntity>,
  ) {}

  async onModuleInit() {
    try {
      for (const item of dataBank  ) {
        const existingBankEntity = await this.BankEntityRepository.findOneBy({
          id: item.id,
        });

        if (existingBankEntity) {
          // await this.BankEntityRepository.update(existingBankEntity.id, {
          // name: item.name,
          // code: item.code,
          // shortName: item.shortName,
          // });
        } else {
          const newBankEntity = this.BankEntityRepository.create({
            id: item.id,
            name: item.name,
            code: item.code,
            shortName: item.shortName,
          });

          await this.BankEntityRepository.save(newBankEntity);
        }
      }

      this.logger.log('Seeder successfully!');
    } catch (error) {
      this.logger.error('Error seeding data:', error);
    }
  }
}
