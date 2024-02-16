import { AggregateRoot } from '../../../../common/ddd/core/domain/entities/aggregate-root';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';

export class TaxPayer extends AggregateRoot<string> {
  // taxCode: TaxCode
  name: string;
  password: string;
  email: Email;
  phoneNumber: PhoneNumber;
  // <!-- address: string -->
  // <!-- bankName: string -->
  // <!-- bankNumber: string -->

  // taxPayerStatus: TaxPayerStatus

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(id: string) {
    super(id);
  }

  static Builder(id: string): TaxPayerBuilder {
    return new TaxPayerBuilder(id);
  }
}

//       Factory   sử dụng mẫu   Builder
// class TaxPayerBuilder {
