import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';

import { TaxCode } from '../value-objects/tax-code';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { TaxPayerStatus } from '../value-objects/tax-payer-status';

export class TaxPayer extends AggregateRoot<TaxCode> {
  name: string;
  password: string;
  email: Email;
  phoneNumber: PhoneNumber;
  // <!-- address: string -->
  // <!-- bankName: string -->
  // <!-- bankNumber: string -->

  taxPayerStatus: TaxPayerStatus;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(taxCode: TaxCode) {
    super(taxCode);
  }

  // static Builder(taxCode: string): TaxPayerBuilder {
  //   return new TaxPayerBuilder(taxCode);
  // }
}

//       Factory   sử dụng mẫu   Builder
// class TaxPayerBuilder {
