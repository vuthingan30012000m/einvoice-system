import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { TaxCode } from '../value-objects/tax-code';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { TaxPayerStatus } from '../value-objects/tax-payer-status';
import { TaxOfficeId } from '../value-objects/tax-office-id';
import { AddressId } from '../value-objects/temp/address-id';
import { BankId } from '../value-objects/bank-id';
import { TaxPayerBuilder } from '../factories/tax-payer.factory';

export class TaxPayer extends AggregateRoot<TaxCode> {
  name: string;
  password: string;
  email: Email;
  phoneNumber: PhoneNumber;
  taxPayerStatus: TaxPayerStatus;
  
  taxOfficeId: TaxOfficeId;
  bankId: BankId;
  addressId: AddressId;
  

  constructor(taxCode: TaxCode) {
    super(taxCode);
  }

  static Builder(taxCode: TaxCode): TaxPayerBuilder {
    return new TaxPayerBuilder(taxCode);
  }
}
