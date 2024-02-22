import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InvoiceItemRepositoryPort } from '../../../core/application/ports/dataaccess/repositories/invoice-item.repository.port';

import { InvoiceItemEntity } from '../entities/invoice-item.entity';
import { InvoiceItemAdapter } from '../mappers/invoice-item.adapter';
import { InvoiceItem } from './../../../core/domain/entities/invoice-item';
import { InvoiceItemId } from '../../../core/domain/value-objects/invoice-item-id';

@Injectable()
export class InvoiceItemOrmRepository implements InvoiceItemRepositoryPort {
  constructor(
    @InjectRepository(InvoiceItemEntity)
    private readonly InvoiceItemEntityRepository: Repository<InvoiceItemEntity>,
  ) {}

  async save(InvoiceItem: InvoiceItem): Promise<InvoiceItem> {
    const persistenceModel = InvoiceItemAdapter.toPersistence(InvoiceItem);
    const newEntity =
      await this.InvoiceItemEntityRepository.save(persistenceModel);
    return InvoiceItemAdapter.toDomain(newEntity);
  }

  async getAll(): Promise<InvoiceItem[]> {
    const entities = await this.InvoiceItemEntityRepository.find({
      // relations: {
      //   InvoiceItemDetails: true,
      // },
    });

    return entities.map((item) => InvoiceItemAdapter.toDomain(item));
  }

  async getOneById(id: InvoiceItemId): Promise<InvoiceItem> {
    const entity = await this.InvoiceItemEntityRepository.findOne({
      where: {
        id: id.value,
      },
      // relations: {
      //   InvoiceItemDetails: true,
      // },
    });

    return InvoiceItemAdapter.toDomain(entity);
  }

  async delete(InvoiceItem: InvoiceItem): Promise<boolean> {
    const persistenceModel = InvoiceItemAdapter.toPersistence(InvoiceItem);
    const result =
      await this.InvoiceItemEntityRepository.delete(persistenceModel);
    return result.affected > 0;
  }
}
