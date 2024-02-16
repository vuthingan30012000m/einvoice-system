import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { ProductId } from '../value-objects/product-id';

export class Product extends BaseEntity<ProductId> {
  name: string;
  unit: string;
  description: string;
  price: number;
  // price: number;Money

  constructor(productId: ProductId) {
    super(productId);
  }
}
