import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { TaxCode } from '../value-objects/temp/tax-code';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { TaxPayerStatus } from '../value-objects/tax-payer-status';
import { TaxOfficeId } from '../value-objects/temp/tax-office-id';
import { AddressId } from '../value-objects/temp/address-id';
import { BankId } from '../value-objects/temp/bank-id';
import { TaxPayerBuilder } from '../factories/tax-payer-builder';

export class TaxPayer extends AggregateRoot<TaxCode> {
  name: string;
  password: string;
  email: Email;
  phoneNumber: PhoneNumber;
  taxPayerStatus: TaxPayerStatus;

  addressId: AddressId;
  
  bankId: BankId;
  taxOfficeId: TaxOfficeId;

  constructor(taxCode: TaxCode) {
    super(taxCode);
  }

  static Builder(taxCode: TaxCode): TaxPayerBuilder {
    return new TaxPayerBuilder(taxCode);
  }
}
