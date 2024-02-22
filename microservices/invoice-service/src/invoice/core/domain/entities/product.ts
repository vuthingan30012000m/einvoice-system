import { ProductId } from '../value-objects/product-id';
import { Money } from '../value-objects/money';

export class Product {
  productId: ProductId;
  name: string;
  unit: string;
  price: Money;
  description: string;
  
  // productId: ProductId;

  constructor(productId: ProductId) {
    this.productId = productId;
  }

  static Builder(productId: ProductId): ProductBuilder {
    return new ProductBuilder(productId);
  }
}

class ProductBuilder {
  private product: Product;

  constructor(productId: ProductId) {
    this.product = new Product(productId);
  }
  withName(name: string): ProductBuilder {
    this.product.name = name;
    return this;
  }

  withUnit(unit: string): ProductBuilder {
    this.product.unit = unit;
    return this;
  }

  withPrice(price: Money): ProductBuilder {
    this.product.price = price;
    return this;
  }

  withDescription(description: string): ProductBuilder {
    this.product.description = description;
    return this;
  }

  build(): Product {
    return this.product;
  }
}
