import { ProductEntity } from '../entities/product.entity';
import { Product } from '../../../core/domain/entities/product';

import { WardEntity } from '../entities/ward.entity';

import { ProductId } from '../../../core/domain/value-objects/product-id';
import { WardId } from '../../../core/domain/value-objects/ward-id';
import { Money } from 'src/invoice/core/domain/value-objects/money';
import { TaxPayerEntity } from '../entities/tax-payer.entity';
import { TaxCode } from 'src/invoice/core/domain/value-objects/tax-code';

export class ProductAdapter {
  static toDomain(ProductEntity: ProductEntity): Product {
    if (!ProductEntity) return null;

    const ProductModel = Product.Builder(new ProductId(ProductEntity.id))
      .withName(ProductEntity.name)
      .withUnit(ProductEntity.unit)
      .withPrice(new Money(ProductEntity.price))
      .withDescription(ProductEntity.description)
      .withTaxRate(ProductEntity.taxRate)
      .withTaxPayerId(new TaxCode(ProductEntity.TaxPayer.id))
      .build();

    return ProductModel;
  }

  static toPersistence(Product: Product): ProductEntity {
    if (!Product) return null;

    const entity = new ProductEntity();

    entity.id = Product.productId.value;

    entity.name = Product.name;
    entity.unit = Product.unit;
    entity.price = Product.price.value;
    entity.description = Product.description;
    entity.taxRate = Product.taxRate;

    const taxPayer = new TaxPayerEntity();
    taxPayer.id = Product.taxPayerId.value;
    entity.TaxPayer = taxPayer;

    return entity;
  }
}
