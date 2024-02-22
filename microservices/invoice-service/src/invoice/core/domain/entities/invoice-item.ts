import { InvoiceId } from '../value-objects/invoice-id';
import { InvoiceItemId } from '../value-objects/invoice-item-id';
import { Money } from '../value-objects/money';
import { ProductId } from '../value-objects/product-id';

export class InvoiceItem {
  invoiceItemId: InvoiceItemId;

  productId: ProductId;
  quantity: number;
  price: Money;
  subTotal: Money;
  taxRate: number;

  invoiceId: InvoiceId;

  constructor(invoiceItemId: InvoiceItemId) {
    this.invoiceItemId = invoiceItemId;
  }

  static Builder(invoiceItemId: InvoiceItemId): InvoiceItemBuilder {
    return new InvoiceItemBuilder(invoiceItemId);
  }
}

class InvoiceItemBuilder {
  private invoiceItem: InvoiceItem;

  constructor(invoiceItemId: InvoiceItemId) {
    this.invoiceItem = new InvoiceItem(invoiceItemId);
  }

  withProductId(productId: ProductId): InvoiceItemBuilder {
    this.invoiceItem.productId = productId;
    return this;
  }

  withQuantity(quantity: number): InvoiceItemBuilder {
    this.invoiceItem.quantity = quantity;
    return this;
  }

  withInvoiceId(invoiceId: InvoiceId): InvoiceItemBuilder {
    this.invoiceItem.invoiceId = invoiceId;
    return this;
  }

  build(): InvoiceItem {
    return this.invoiceItem;
  }
}
