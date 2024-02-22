import { InvoiceEntity } from '../entities/invoice.entity';
import { Invoice } from '../../../core/domain/entities/invoice';

import { WardEntity } from '../entities/ward.entity';

import { InvoiceId } from '../../../core/domain/value-objects/invoice-id';
import { WardId } from '../../../core/domain/value-objects/ward-id';
import { Money } from 'src/invoice/core/domain/value-objects/money';
import { TaxPayerEntity } from '../entities/tax-payer.entity';
import { TaxCode } from 'src/invoice/core/domain/value-objects/tax-code';
import { InvoiceItem } from 'src/invoice/core/domain/entities/invoice-item';
import { ProductId } from '../../../core/domain/value-objects/product-id';
import { InvoiceItemEntity } from '../entities/invoice-item.entity';

export class InvoiceAdapter {
  static toDomain(InvoiceEntity: InvoiceEntity): Invoice {
    if (!InvoiceEntity) return null;

    const invoiceId = new InvoiceId(InvoiceEntity.id);

    const invoiceItems = InvoiceEntity.invoiceItems.map((item) => {
      return InvoiceItem.Builder(new InvoiceId(item.id))
        .withProductId(new ProductId(item.product.id))
        .withQuantity(Number(item.quantity))
        .withPrice(new Money(Number(item.price)))
        .withTaxRate(Number(item.taxRate))
        .withSubTotal(new Money(item.subTotal))
        .withInvoiceId(invoiceId)
        .build();
    });

    const InvoiceModel = Invoice.Builder(new InvoiceId(InvoiceEntity.id))
      .withSellerId(new TaxCode(InvoiceEntity.seller.id))
      .withBuyerId(new TaxCode(InvoiceEntity.buyer.id))
      .withItem(invoiceItems)
      .withTotalAfterTax(new Money(InvoiceEntity.totalAfterTax))
      .withTotalBeforeTax(new Money(InvoiceEntity.totalBeforeTax))
      .build();

    return InvoiceModel;
  }

  static toPersistence(Invoice: Invoice): InvoiceEntity {
    if (!Invoice) return null;

    const entity = new InvoiceEntity();

    entity.id = Invoice.invoiceId.value;

    const seller = new TaxPayerEntity();
    entity.seller.id = Invoice.sellerId.value;
    entity.seller = seller;

    const buyer = new TaxPayerEntity();
    entity.buyer.id = Invoice.buyerId.value;
    entity.buyer = buyer;

    entity.invoiceItems = Invoice.invoiceItems.map((item) => {
      const itemEntity = new InvoiceItemEntity();
      itemEntity.id = item.invoiceItemId.value;
      itemEntity.quantity = item.quantity;
      itemEntity.price = item.price.value;
      itemEntity.taxRate = item.taxRate;
      itemEntity.subTotal = item.subTotal.value;
      return itemEntity;
    });

    entity.totalAfterTax = Invoice.totalAfterTax.value;
    entity.totalBeforeTax = Invoice.totalBeforeTax.value;

    return entity;
  }
}
