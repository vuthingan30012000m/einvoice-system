import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductRepositoryPort } from '../../../core/application/ports/dataaccess/repositories/product.repository.port';

import { ProductEntity } from '../entities/product.entity';
import { ProductAdapter } from '../mappers/product.adapter';
import { Product } from './../../../core/domain/entities/product';
import { ProductId } from '../../../core/domain/value-objects/product-id';

@Injectable()
export class ProductOrmRepository implements ProductRepositoryPort {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ProductEntityRepository: Repository<ProductEntity>,
  ) {}

  async save(Product: Product): Promise<Product> {
    const persistenceModel = ProductAdapter.toPersistence(Product);
    const newEntity = await this.ProductEntityRepository.save(persistenceModel);
    return ProductAdapter.toDomain(newEntity);
  }

  async getAll(): Promise<Product[]> {
    const entities = await this.ProductEntityRepository.find({
      // relations: {
      // ward: true,
      // },
    });

    return entities.map((item) => ProductAdapter.toDomain(item));
  }

  async getOneById(id: ProductId): Promise<Product> {
    const entity = await this.ProductEntityRepository.findOne({
      where: {
        id: id.value,
      },
      // relations: {
      // ward: true,
      // },
    });

    return ProductAdapter.toDomain(entity);
  }

  async delete(Product: Product): Promise<boolean> {
    const persistenceModel = ProductAdapter.toPersistence(Product);
    const result = await this.ProductEntityRepository.delete(persistenceModel);
    return result.affected > 0;
  }
}
