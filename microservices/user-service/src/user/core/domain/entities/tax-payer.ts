import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { TaxCode } from '../value-objects/tax-code';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { TaxPayerStatus } from '../value-objects/tax-payer-status';
import { TaxOfficeId } from '../value-objects/tax-office-id';
import { AddressId } from '../value-objects/address-id';
import { BankId } from '../value-objects/bank-id';
import { TaxPayerBuilder } from '../factories/tax-payer-builder';

export class TaxPayer extends AggregateRoot<TaxCode> {
  nameTaxPayer: string;
  password: string;
  email: Email;
  phoneNumber: PhoneNumber;

  addressId: AddressId;
  bankId: BankId;

  taxPayerStatus: TaxPayerStatus;
  taxOfficeId: TaxOfficeId;

  constructor(taxCode: TaxCode) {
    super(taxCode);
  }

  static Builder(taxCode: TaxCode): TaxPayerBuilder {
    return new TaxPayerBuilder(taxCode);
  }
}
