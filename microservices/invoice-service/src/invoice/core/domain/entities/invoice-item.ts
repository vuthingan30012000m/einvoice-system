import { InvoiceId } from '../value-objects/invoice-id';
import { InvoiceItemId } from '../value-objects/invoice-item-id';
import { Money } from '../value-objects/money';
import { ProductId } from '../value-objects/product-id';

export class InvoiceItem {
  invoiceItemId: InvoiceItemId;

  // productId: ProductId;

  quantity: number;
  price: Money;
  taxRate: number;
  subTotal: Money;

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

  // withProductId(productId: ProductId): InvoiceItemBuilder {
  //   this.invoiceItem.productId = productId;
  //   return this;
  // }

  withQuantity(quantity: number): InvoiceItemBuilder {
    this.invoiceItem.quantity = quantity;
    return this;
  }

  withPrice(price: Money): InvoiceItemBuilder {
    this.invoiceItem.price = price;
    return this;
  }

  withTaxRate(taxRate: number): InvoiceItemBuilder {
    this.invoiceItem.taxRate = taxRate;
    return this;
  }

  withSubTotal(subTotal: Money): InvoiceItemBuilder {
    this.invoiceItem.subTotal = subTotal;
    return this;
  }

  build(): InvoiceItem {
    return this.invoiceItem;
  }
}
