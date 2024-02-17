import { DomainEntity } from '../../../../common/ddd/oop/core/domain/entities/domain.entity';
import { TaxCode } from '../value-objects/tax-code';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { TaxPayerStatus } from '../value-objects/tax-payer-status';
import { TaxOfficeId } from '../value-objects/tax-office-id';
import { AddressId } from '../value-objects/address-id';
import { BankDetailId } from '../value-objects/bank-detail-id';

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

class TaxPayerBuilder {
  private taxPayer: TaxPayer;

  constructor(taxCode: TaxCode) {
    this.taxPayer = new TaxPayer(taxCode);
  }

  withNameTaxPayer(name: string): TaxPayerBuilder {
    this.taxPayer.name = name;
    return this;
  }

  withPassword(password: string): TaxPayerBuilder {
    this.taxPayer.password = password;
    return this;
  }

  withEmail(email: Email): TaxPayerBuilder {
    this.taxPayer.email = email;
    return this;
  }

  withPhoneNumber(phoneNumber: PhoneNumber): TaxPayerBuilder {
    this.taxPayer.phoneNumber = phoneNumber;
    return this;
  }

  withAddressId(addressId: AddressId): TaxPayerBuilder {
    this.taxPayer.addressId = addressId;
    return this;
  }
  withBankId(bankDetailId: BankDetailId): TaxPayerBuilder {
    this.taxPayer.bankDetailId = bankDetailId;
    return this;
  }

  withTaxPayerStatus(taxPayerStatus: TaxPayerStatus): TaxPayerBuilder {
    this.taxPayer.taxPayerStatus = taxPayerStatus;
    return this;
  }

  withTaxOfficeId(taxOfficeId: TaxOfficeId): TaxPayerBuilder {
    this.taxPayer.taxOfficeId = taxOfficeId;
    return this;
  }

  build(): TaxPayer {
    return this.taxPayer;
  }
}

// const newTaxPayer = TaxPayer.Builder(new TaxCode(randomUUID()))
// .withNameTaxPayer(payload.name)
// .withPassword(payload.password)
// .withEmail(new Email(payload.email))
// .withPhoneNumber(new PhoneNumber(payload.phoneNumber))
// .withTaxOfficeId(new TaxOfficeId(payload.taxOfficeId))
// .withBankId(new BankId(payload.bankId))
// .withAccountBank(payload.accountBank)
// .withAddress(payload.wardId, payload.noteAddress)
// .build();
