// import { TaxPayerException } from './../exceptions/tax-payer.exception';

import { TaxPayer } from '../entities/tax-payer';
import { AddressId } from '../value-objects/address-id';
import { BankId } from '../value-objects/bank-id';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { TaxCode } from '../value-objects/tax-code';
import { TaxOfficeId } from '../value-objects/tax-office-id';
import { TaxPayerStatus } from '../value-objects/tax-payer-status';

// Factory sử dụng mẫu Builder
export class TaxPayerBuilder {
  private taxPayer: TaxPayer;

  constructor(taxCode: TaxCode) {
    this.taxPayer = new TaxPayer(taxCode);
  }

  withNameTaxPayer(name: string): TaxPayerBuilder {
    this.taxPayer.nameTaxPayer = name;
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
  withBankId(bankId: BankId): TaxPayerBuilder {
    this.taxPayer.bankId = bankId;
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

// const taxPayer = TaxPayer.Builder("tax_code")
// .withNameTaxPayer("name")
// .withPassword("password")
// .withEmail(new Email("email"))
// .withPhoneNumber(new PhoneNumber("phone_number"))
// .withAddressId(new AddressId("address_id"))
// .withBankId(new BankId("bank_id"))
// .withTaxPayerStatus( TaxPayerStatus.PENDING)
// .withTaxOfficeId(new TaxOfficeId("tax_office_id"))
// .build();