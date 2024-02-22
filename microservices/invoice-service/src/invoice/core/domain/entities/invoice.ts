import { InvoiceId } from '../value-objects/invoice-id';
import { SellerId } from '../value-objects/seller-id';
import { BuyerId } from '../value-objects/buyer-id';
import { InvoiceItem } from './invoice-item';
import { Money } from '../value-objects/money';

export class Invoice {
  invoiceId: InvoiceId;

  sellerId: SellerId;
  buyerId: BuyerId;

  invoiceItems = new Array<InvoiceItem>();

  totalBeforeTax: Money;
  totalAfterTax: Money;

  constructor(invoiceId: InvoiceId) {
    this.invoiceId = invoiceId;
  }

  static Builder(invoiceId: InvoiceId): InvoiceBuilder {
    return new InvoiceBuilder(invoiceId);
  }
}

class InvoiceBuilder {
  private invoice: Invoice;

  constructor(invoiceId: InvoiceId) {
    this.invoice = new Invoice(invoiceId);
  }
  withSellerId(sellerId: SellerId): InvoiceBuilder {
    this.invoice.sellerId = sellerId;
    return this;
  }
  withBuyerId(buyerId: BuyerId): InvoiceBuilder {
    this.invoice.buyerId = buyerId;
    return this;
  }
  withItem(invoiceItems: InvoiceItem[]): InvoiceBuilder {
    invoiceItems.map((item) => this.invoice.invoiceItems.push(item));
    return this;
  }
  withTotalBeforeTax(totalBeforeTax: Money): InvoiceBuilder {
    this.invoice.totalBeforeTax = totalBeforeTax;
    return this;
  }
  withTotalAfterTax(totalAfterTax: Money): InvoiceBuilder {
    this.invoice.totalAfterTax = totalAfterTax;
    return this;
  }
  build(): Invoice {
    return this.invoice;
  }
}
