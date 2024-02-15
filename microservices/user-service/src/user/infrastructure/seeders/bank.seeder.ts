import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankSeeder implements OnModuleInit {
  private logger = new Logger(BankSeeder.name);

  constructor(
    @InjectRepository(Bank)
    private readonly BankRepository: Repository<Bank>,
  ) {}

  async onModuleInit() {
    // const createBankDto={name:"Bank1"}
    // const newBank = this.BankRepository.create( createBankDto)
    // await this.BankRepository.save(newBank);
    this.logger.log('Seeder successfully!');
  }
}
