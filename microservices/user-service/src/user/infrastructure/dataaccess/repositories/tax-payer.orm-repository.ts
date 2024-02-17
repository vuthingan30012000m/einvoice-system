import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaxPayerRepository } from 'src/user/core/application/ports/dataaccess/repositories/tax-payer.repository';

import { TaxPayerEntity } from '../entities/tax-payer.entity';
import { TaxPayerAdapter } from '../mappers/tax-payer.adapter';
import { TaxPayer } from './../../../core/domain/entities/tax-payer';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { Email } from 'src/user/core/domain/value-objects/email';
import { PhoneNumber } from 'src/user/core/domain/value-objects/phone-number';

@Injectable()
export class TaxPayerOrmRepository implements TaxPayerRepository {
  constructor(
    @InjectRepository(TaxPayerEntity)
    private readonly TaxPayerEntityRepository: Repository<TaxPayerEntity>,
  ) {}

  async save(TaxPayer: TaxPayer): Promise<TaxPayer> {
    const persistenceModel = TaxPayerAdapter.toPersistence(TaxPayer);
    const newEntity =
      await this.TaxPayerEntityRepository.save(persistenceModel);
    return TaxPayerAdapter.toDomain(newEntity);
  }

  async getAll(): Promise<TaxPayer[]> {
    const entities = await this.TaxPayerEntityRepository.find();

    return entities.map((item) => TaxPayerAdapter.toDomain(item));
  }

  async getOneById(id: TaxCode): Promise<TaxPayer> {
    const entity = await this.TaxPayerEntityRepository.findOneBy({
      id: id.value,
    });
    // const entity = await this.TaxPayerEntityRepository.findOne(id);
    return TaxPayerAdapter.toDomain(entity);
  }

  async delete(TaxPayer: TaxPayer): Promise<boolean> {
    const persistenceModel = TaxPayerAdapter.toPersistence(TaxPayer);
    const result =
      await this.TaxPayerEntityRepository.delete(persistenceModel);
    return result.affected > 0;
  }

 async getOneByEmail(email: Email): Promise<TaxPayer> {
  console.log("🚀 ~ TaxPayerOrmRepository ~ getOneByEmail ~ email:", email)
  const entity = await this.TaxPayerEntityRepository.findOneBy({
    email: email.value,
  });
  console.log("🚀 ~ TaxPayerOrmRepository ~ getOneByEmail ~ entity:", entity)
  // const entity = await this.TaxPayerEntityRepository.findOne(id);
  return TaxPayerAdapter.toDomain(entity);
  }


  async getOneByPhoneNumber(PhoneNumber: PhoneNumber): Promise<TaxPayer> {
    const entity = await this.TaxPayerEntityRepository.findOneBy({
      phoneNumber: PhoneNumber.value,
    });
    // const entity = await this.TaxPayerEntityRepository.findOne(id);
    return TaxPayerAdapter.toDomain(entity);
  }
}
