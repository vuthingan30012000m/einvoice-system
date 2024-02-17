import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaxOfficeRepository } from 'src/user/core/application/ports/dataaccess/repositories/tax-office.repository';

import { TaxOfficeEntity } from '../entities/tax-office.entity';
import { TaxOfficeAdapter } from '../mappers/tax-office.adapter';
import { TaxOffice } from './../../../core/domain/entities/tax-office';
import { TaxOfficeId } from 'src/user/core/domain/value-objects/tax-office-id';

@Injectable()
export class TaxOfficeOrmRepository implements TaxOfficeRepository {
  constructor(
    @InjectRepository(TaxOfficeEntity)
    private readonly TaxOfficeEntityRepository: Repository<TaxOfficeEntity>,
  ) {}

  async save(TaxOffice: TaxOffice): Promise<TaxOffice> {
    const persistenceModel = TaxOfficeAdapter.toPersistence(TaxOffice);
    const newEntity =
      await this.TaxOfficeEntityRepository.save(persistenceModel);
    return TaxOfficeAdapter.toDomain(newEntity);
  }

  async getAll(): Promise<TaxOffice[]> {
    const entities = await this.TaxOfficeEntityRepository.find();

    return entities.map((item) => TaxOfficeAdapter.toDomain(item));
  }

  async getOneById(id: TaxOfficeId): Promise<TaxOffice> {
    const entity = await this.TaxOfficeEntityRepository.findOneBy({
      id: id.value,
    });
    // const entity = await this.TaxOfficeEntityRepository.findOne(id);
    return TaxOfficeAdapter.toDomain(entity);
  }

  async delete(TaxOffice: TaxOffice): Promise<boolean> {
    const persistenceModel = TaxOfficeAdapter.toPersistence(TaxOffice);
    const result =
      await this.TaxOfficeEntityRepository.delete(persistenceModel);
    return result.affected > 0;
  }
}
