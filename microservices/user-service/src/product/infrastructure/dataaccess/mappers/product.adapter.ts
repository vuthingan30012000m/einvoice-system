import { ProductName } from 'src/product/core/domain/value-objects/product-name';

import { Product } from 'src/product/core/domain/entities/product';
import { ProductEntity } from '../entities/product.entity';

export class ProductAdapter {
  static toDomain(productEntity: ProductEntity): Product {
    const productModel = Product.Builder(productEntity.id)
      .withName(new ProductName(productEntity.name))
      .withCreatedAt(productEntity.created_at)
      .build();

    return productModel;
  }

  static toPersistence(product: Product): ProductEntity {
    const entity = new ProductEntity();

    entity.id = product.id;
    entity.name = product.name.value;
    entity.created_at = product.createdAt;

    return entity;
  }
}
