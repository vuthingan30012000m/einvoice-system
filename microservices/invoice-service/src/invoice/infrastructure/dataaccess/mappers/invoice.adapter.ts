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
import { InvoiceItemAdapter } from './invoice-item.adapter';
import { map } from 'rxjs';

export class InvoiceAdapter {
  static toDomain(invoiceEntity: InvoiceEntity): Invoice {
    if (!invoiceEntity) return null;

    const invoiceId = new InvoiceId(invoiceEntity.id);

    // const invoiceItems = invoiceEntity.invoiceItems.map((item) => {
    //   return InvoiceItem.Builder(new InvoiceId(item.id))
    //     .withProductId(new ProductId(item.product.id))
    //     .withQuantity(Number(item.quantity))
    //     .withPrice(new Money(Number(item.price)))
    //     .withTaxRate(Number(item.taxRate))
    //     .withSubTotal(new Money(item.subTotal))
    //     .withInvoiceId(invoiceId)
    //     .build();
    // });

    const InvoiceModel = Invoice.Builder(new InvoiceId(invoiceEntity.id))
      // .withSellerId(new TaxCode(invoiceEntity.seller.id))
      // .withBuyerId(new TaxCode(invoiceEntity.buyer.id))
      // .withItem(invoiceItems)
      .withTotalAfterTax(new Money(invoiceEntity.totalAfterTax))
      .withTotalBeforeTax(new Money(invoiceEntity.totalBeforeTax))
      .build();

    return InvoiceModel;
  }

  static toPersistence(invoice: Invoice): InvoiceEntity {
    if (!invoice) return null;

    const entity = new InvoiceEntity();
    entity.id = invoice.invoiceId.value;

    // const seller = new TaxPayerEntity();
    // entity.seller.id = invoice.sellerId.value;
    // entity.seller = seller;

    // const buyer = new TaxPayerEntity();
    // entity.buyer.id = invoice.buyerId.value;
    // entity.buyer = buyer;

    // entity.invoiceItems = InvoiceItemAdapter.toPersistence(invoice.invoiceItems);
    // invoice.invoiceItems.map((item) =>
    //   entity.invoiceItems.push(InvoiceItemAdapter.toPersistence(item)),
    // );

    entity.totalAfterTax = invoice.totalAfterTax.value;
    entity.totalBeforeTax = invoice.totalBeforeTax.value;

    return entity;
  }
}
