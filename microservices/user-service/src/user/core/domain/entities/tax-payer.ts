import { DomainEntity } from '../../../../common/ddd/oop/core/domain/entities/domain.entity';
import { TaxCode } from '../value-objects/tax-code';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { TaxPayerStatus } from '../value-objects/tax-payer-status';
import { TaxOfficeId } from '../value-objects/tax-office-id';
import { AddressId } from '../value-objects/address-id';
import { BankDetailId } from '../value-objects/bank-detail-id';
import { TaxPayerException } from '../exceptions/tax-payer.exception';

export class TaxPayer extends DomainEntity<TaxCode> {
  name: string;
  email: Email;
  password: string;
  phoneNumber: PhoneNumber;
  taxPayerStatus: TaxPayerStatus;

  taxOfficeId: TaxOfficeId;

  bankDetailId: BankDetailId;

  addressId: AddressId;

  verifyEmail() {
    if (this.taxPayerStatus != TaxPayerStatus.PENDING) {
      throw new TaxPayerException('Trạng thái của người nộp thuế không đúng.');
    }
    this.taxPayerStatus = TaxPayerStatus.VERIFY_EMAIL;
  }

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

  withName(name: string): TaxPayerBuilder {
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

  withTaxOfficeId(taxOfficeId: TaxOfficeId): TaxPayerBuilder {
    this.taxPayer.taxOfficeId = taxOfficeId;
    return this;
  }

  withBankDetailId(bankDetailId: BankDetailId): TaxPayerBuilder {
    this.taxPayer.bankDetailId = bankDetailId;
    return this;
  }
  withAddressId(addressId: AddressId): TaxPayerBuilder {
    this.taxPayer.addressId = addressId;
    return this;
  }

  withTaxPayerStatus(taxPayerStatus: TaxPayerStatus): TaxPayerBuilder {
    this.taxPayer.taxPayerStatus = taxPayerStatus;
    return this;
  }

  build(): TaxPayer {
    return this.taxPayer;
  }
}
