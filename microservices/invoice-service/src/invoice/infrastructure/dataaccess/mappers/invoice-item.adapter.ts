import { InvoiceItemEntity } from '../entities/invoice-item.entity';
import { InvoiceItem } from '../../../core/domain/entities/invoice-item';

import { InvoiceEntity } from '../entities/invoice.entity';

import { InvoiceItemId } from '../../../core/domain/value-objects/invoice-item-id';
import { InvoiceId } from '../../../core/domain/value-objects/invoice-id';
import { ProductId } from '../../../core/domain/value-objects/product-id';
import { Money } from 'src/invoice/core/domain/value-objects/money';
import { ProductEntity } from '../entities/product.entity';

export class InvoiceItemAdapter {
  static toDomain(InvoiceItemEntity: InvoiceItemEntity): InvoiceItem {
    if (!InvoiceItemEntity) return null;

    const InvoiceItemModel = InvoiceItem.Builder(
      new InvoiceItemId(InvoiceItemEntity.id),
    )
      // .withProductId(new ProductId(InvoiceItemEntity.product.id))
      // .withQuantity(Number(InvoiceItemEntity.quantity))
      // .withPrice(new Money(InvoiceItemEntity.price))
      // .withTaxRate(Number(InvoiceItemEntity.taxRate))
      .withSubTotal(new Money(InvoiceItemEntity.subTotal))
      // .withInvoiceId(new InvoiceId(InvoiceItemEntity.invoice.id))
      .build();

    return InvoiceItemModel;
  }

  static toPersistence(InvoiceItem: InvoiceItem): InvoiceItemEntity {
    if (!InvoiceItem) return null;

    const entity = new InvoiceItemEntity();

    entity.id = InvoiceItem.invoiceItemId.value;

    // const product = new ProductEntity();
    // product.id = InvoiceItem.productId.value;
    // entity.product = product;

    // entity.quantity = InvoiceItem.quantity;
    // entity.price = InvoiceItem.price.value;
    // entity.taxRate = InvoiceItem.taxRate;
    entity.subTotal = InvoiceItem.subTotal.value;

    // const Invoice = new InvoiceEntity();
    // Invoice.id = InvoiceItem.invoiceId.value;
    // entity.invoice = Invoice;

    return entity;
  }
}
