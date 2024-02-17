import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { TaxCode } from '../value-objects/tax-code';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { TaxPayerStatus } from '../value-objects/tax-payer-status';
import { TaxOfficeId } from '../value-objects/tax-office-id';
import { AddressId } from '../value-objects/address-id';
import { BankDetailId } from '../value-objects/bank-detail-id';
import { TaxPayerBuilder } from '../factories/tax-payer.factory';

export class TaxPayer extends DomainEntity<TaxCode> {
  name: string;
  password: string;
  email: Email;
  phoneNumber: PhoneNumber;
  taxPayerStatus: TaxPayerStatus;
  taxOfficeId: TaxOfficeId;
  bankDetailId: BankDetailId;
  addressId: AddressId;

  constructor(taxCode: TaxCode) {
    super(taxCode);
  }

  static Builder(taxCode: TaxCode): TaxPayerBuilder {
    return new TaxPayerBuilder(taxCode);
  }
}
