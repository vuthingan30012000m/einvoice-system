import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { TaxCode } from '../value-objects/tax-code';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { TaxPayerStatus } from '../value-objects/tax-payer-status';
import { TaxOfficeId } from '../value-objects/tax-office-id';
import { AddressId } from '../value-objects/address-id';
import { BankId } from '../value-objects/bank-id';
import { TaxPayerBuilder } from '../factories/tax-payer.factory';
import { TaxOffice } from './tax-office';
import { Bank } from './bank';
import { Address } from './address';

export class TaxPayer extends AggregateRoot<TaxCode> {
  name: string;
  password: string;
  email: Email;
  phoneNumber: PhoneNumber;
  taxPayerStatus: TaxPayerStatus;

  taxOffice: TaxOffice;
  bank: Bank;
  address: Address;

  constructor(taxCode: TaxCode) {
    super(taxCode);
  }

  static Builder(taxCode: TaxCode): TaxPayerBuilder {
    return new TaxPayerBuilder(taxCode);
  }
}
