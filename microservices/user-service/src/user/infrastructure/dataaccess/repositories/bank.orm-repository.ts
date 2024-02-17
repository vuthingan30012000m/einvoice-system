import { Bank } from './../../../core/domain/entities/bank';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BankRepository } from 'src/user/core/application/ports/dataaccess/repositories/bank.repository';
import { BankEntity } from '../entities/bank.entity';
import { BankAdapter } from '../mappers/bank.adapter';

@Injectable()
export class BankOrmRepository implements BankRepository {
  constructor(
    @InjectRepository(BankEntity)
    private readonly BankEntityRepository: Repository<BankEntity>,
  ) {}

  async save(Bank: Bank): Promise<Bank> {
    const persistenceModel = BankAdapter.toPersistence(Bank);
    const newEntity =
      await this.BankEntityRepository.save(persistenceModel);
    return BankAdapter.toDomain(newEntity);
  }

  async getAll(): Promise<Bank[]> {
    const entities = await this.BankEntityRepository.find();

    return entities.map((item) => BankAdapter.toDomain(item));
  }

  async getOneById(id: any): Promise<Bank> {
    const entity = await this.BankEntityRepository.findOne(id);
    return BankAdapter.toDomain(entity);
  }

  async delete(Bank: Bank): Promise<boolean> {
    const persistenceModel = BankAdapter.toPersistence(Bank);
    const result =
      await this.BankEntityRepository.delete(persistenceModel);
    return result.affected > 0;
  }
}
