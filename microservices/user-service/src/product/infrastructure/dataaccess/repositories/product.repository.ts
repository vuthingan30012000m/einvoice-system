import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/product/core/domain/entities/product';
import { ProductEntity } from '../entities/product.entity';
import { ProductAdapter } from '../mappers/product.adapter';

import { CreateProductPort } from 'src/product/core/application/commands/create-product/create-product.port';
import { FindAllProductPort } from 'src/product/core/application/queries/find-all-product/find-all-product.port';

@Injectable()
export class OrmProductRepository
  implements CreateProductPort, FindAllProductPort
{
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async save(product: Product): Promise<Product> {
    const persistenceModel = ProductAdapter.toPersistence(product);
    const newEntity = await this.productRepository.save(persistenceModel);
    return ProductAdapter.toDomain(newEntity);
  }

  async findAll(): Promise<Product[]> {
    const entities = await this.productRepository.find();

    return entities.map((item) => ProductAdapter.toDomain(item));
  }
}
