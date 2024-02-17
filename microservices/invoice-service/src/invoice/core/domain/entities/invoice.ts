import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { BuyerId } from '../value-objects/buyer-id';
import { InvoiceId } from '../value-objects/invoice-id';
import { SellerId } from '../value-objects/seller-id';
import { InvoiceItem } from './invoice-item';

export class Invoice extends AggregateRoot<InvoiceId> {
  sellerId: SellerId;
  buyerId: BuyerId;

  items = new Array<InvoiceItem>();

  // totalBeforeTax : Float
  // totalAfterTax : Float
  // Money

  constructor(invoiceId: InvoiceId) {
    super(invoiceId);
  }

  // static Builder(invoiceId: InvoiceId): InvoiceBuilder {
  // return new InvoiceBuilder(invoiceId);
  // }
}
