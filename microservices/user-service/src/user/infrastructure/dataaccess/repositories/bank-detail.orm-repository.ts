import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BankDetailRepository } from 'src/user/core/application/ports/dataaccess/repositories/bank-detail.repository';

import { BankDetailEntity } from '../entities/bank-detail.entity';
import { BankDetailAdapter } from '../mappers/bank-detail.adapter';
import { BankDetail } from './../../../core/domain/entities/bank-detail';
import { BankId } from 'src/user/core/domain/value-objects/bank-id';
import { BankDetailId } from 'src/user/core/domain/value-objects/bank-detail-id';

@Injectable()
export class BankDetailOrmRepository implements BankDetailRepository {
  constructor(
    @InjectRepository(BankDetailEntity)
    private readonly BankDetailEntityRepository: Repository<BankDetailEntity>,
  ) {}

  async save(BankDetail: BankDetail): Promise<BankDetail> {
    const persistenceModel = BankDetailAdapter.toPersistence(BankDetail);
    const newEntity =
      await this.BankDetailEntityRepository.save(persistenceModel);
    return BankDetailAdapter.toDomain(newEntity);
  }

  async getAll(): Promise<BankDetail[]> {
    const entities = await this.BankDetailEntityRepository.find();

    return entities.map((item) => BankDetailAdapter.toDomain(item));
  }

  async getOneById(id: BankDetailId): Promise<BankDetail> {
    const entity = await this.BankDetailEntityRepository.findOneBy({id:id.value});
    return BankDetailAdapter.toDomain(entity);
  }

  async delete(BankDetail: BankDetail): Promise<boolean> {
    const persistenceModel = BankDetailAdapter.toPersistence(BankDetail);
    const result =
      await this.BankDetailEntityRepository.delete(persistenceModel);
    return result.affected > 0;
  }



  async  getAccountBank(accountBank: string, bankId: BankId): Promise<boolean> {
    const entity = await this.BankDetailEntityRepository.findOne({
      where: {
        accountBank,
        bank: {
          id: bankId.value,
        },
      },
    });

    return !!entity;
      
  }
}
