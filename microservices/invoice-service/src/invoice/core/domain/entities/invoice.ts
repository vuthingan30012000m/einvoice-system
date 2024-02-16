import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { CustomerId } from '../value-objects/customer-id';

import { InvoiceId } from '../value-objects/invoice-id';
import { UserId } from '../value-objects/user-id';

export class Invoice extends AggregateRoot<InvoiceId> {
  userId: UserId;
  customerId: CustomerId;
  // items = new Array<InvoiceItem>();

  //  totalBeforeTax    : Money
  //  totalAfterTax    : Money

  //
  //   Customer
  //   name        String
  //   email       String
  //   phoneNumber String
  //   addressId   Int
  //   bankId      String
  //

  constructor(invoiceId: InvoiceId) {
    super(invoiceId);
  }

  // static Builder(invoiceId: InvoiceId): TaxPayerBuilder {
  //   return new TaxPayerBuilder(invoiceId);
  // }
}

// <!-- model InvoiceItem { -->
//   <!-- id        Int     @id @default(autoincrement()) -->
//   <!-- unitPrice Float -->
//   <!-- quantity  Int -->
//   <!-- taxRate   Float -->

//   <!-- productId Int -->
//   <!-- product   Product @relation(fields: [productId], references: [id]) -->

//   <!-- invoiceId Int -->
//   <!-- invoice   Invoice @relation(fields: [invoiceId], references: [id]) -->
// }

// <!-- model Product { -->
//   <!-- id           Int           @id @default(autoincrement()) -->
//   <!-- name         String -->
//   <!-- description  String -->
//   <!-- price        Float -->
// }
