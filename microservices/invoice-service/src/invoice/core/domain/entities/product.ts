import { ProductId } from '../value-objects/product-id';
import { Money } from '../value-objects/money';

export class Product {
  productId: ProductId;
  name: string;
  unit: string;
  price: Money;
  description: string;

  constructor(productId: ProductId) {
    this.productId = productId;
  }
}
