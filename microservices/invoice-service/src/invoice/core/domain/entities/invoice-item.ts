import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { InvoiceId } from '../value-objects/invoice-id';
import { InvoiceItemId } from '../value-objects/invoice-item-id';
import { ProductId } from '../value-objects/product-id';

export class InvoiceItem extends BaseEntity<InvoiceItemId> {
  // unitPrice: Float;
  // quantity: Float;
  // taxRate: Float;

  productId: ProductId;
  invoiceId: InvoiceId;

  constructor(invoiceItemId: InvoiceItemId) {
    super(invoiceItemId);
  }

  // static Builder(InvoiceItemId: InvoiceItemId): InvoiceBuilder {
  // return new InvoiceBuilder(InvoiceItemId);
  // }
}
