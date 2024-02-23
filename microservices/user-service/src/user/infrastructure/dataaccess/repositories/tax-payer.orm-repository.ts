import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaxPayerRepositoryPort } from '../../../core/application/ports/dataaccess/repositories/tax-payer.repository.port';

import { TaxPayerEntity } from '../entities/tax-payer.entity';
import { TaxPayerAdapter } from '../mappers/tax-payer.adapter';
import { TaxPayer } from './../../../core/domain/entities/tax-payer';
import { TaxCode } from './../../../core/domain/value-objects/tax-code';
import { Email } from '../../../core/domain/value-objects/email';
import { PhoneNumber } from './../../../core/domain/value-objects/phone-number';
import { TaxPayerException } from './../../../core/domain/exceptions/tax-payer.exception';

@Injectable()
export class TaxPayerOrmRepository implements TaxPayerRepositoryPort {
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
    const entities = await this.TaxPayerEntityRepository.find({
      relations: {
        taxOffice: true,
        bankDetail: true,
        address: true,
      },
    });

    return entities.map((item) => TaxPayerAdapter.toDomain(item));
  }

  async getOneById(id: TaxCode): Promise<TaxPayer> {
    const entity = await this.TaxPayerEntityRepository.findOne({
      where: {
        id: id.value,
      },
      relations: {
        taxOffice: true,
        bankDetail: true,
        address: true,
      },
    });

    return TaxPayerAdapter.toDomain(entity);
  }

  async delete(TaxPayer: TaxPayer): Promise<boolean> {
    throw new TaxPayerException('Method not implemented.');
  }

  async getOneByEmail(email: Email): Promise<TaxPayer> {
    const entity = await this.TaxPayerEntityRepository.findOne({
      where: {
        email: email.value,
      },
      relations: {
        taxOffice: true,
        bankDetail: true,
        address: true,
      },
    });
    return TaxPayerAdapter.toDomain(entity);
  }

  async getOneByPhoneNumber(PhoneNumber: PhoneNumber): Promise<TaxPayer> {
    const entity = await this.TaxPayerEntityRepository.findOne({
      where: {
        phoneNumber: PhoneNumber.value,
      },
      relations: {
        taxOffice: true,
        bankDetail: true,
        address: true,
      },
    });

    return TaxPayerAdapter.toDomain(entity);
  }
}
