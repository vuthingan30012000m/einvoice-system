import { TaxPayer } from 'src/user/core/domain/entities/tax-payer';
import { TaxPayerEntity } from '../entities/tax-payer.entity';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { Email } from 'src/user/core/domain/value-objects/email';
import { PhoneNumber } from 'src/user/core/domain/value-objects/phone-number';
import { TaxOfficeId } from 'src/user/core/domain/value-objects/tax-office-id';
import { BankDetailId } from 'src/user/core/domain/value-objects/bank-detail-id';
import { AddressId } from 'src/user/core/domain/value-objects/address-id';

export class TaxPayerAdapter {
  static toDomain(TaxPayerEntity: TaxPayerEntity): TaxPayer {
    const TaxPayerModel = TaxPayer.Builder(new TaxCode(TaxPayerEntity.id))
      .withName(TaxPayerEntity.name)
      .withPassword(TaxPayerEntity.password)
      .withEmail(new Email(TaxPayerEntity.email))
      .withPhoneNumber(new PhoneNumber(TaxPayerEntity.phoneNumber))
      .withTaxOfficeId(new TaxOfficeId(TaxPayerEntity.taxOfficeId))
      .withBankDetailId(new BankDetailId(TaxPayerEntity.bankDetailId))
      .withAddressId(new AddressId(TaxPayerEntity.addressId))
      .withTaxPayerStatus(TaxPayerEntity.taxPayerStatus)
      .build();

    return TaxPayerModel;
  }

  static toPersistence(TaxPayer: TaxPayer): TaxPayerEntity {
    const entity = new TaxPayerEntity();

    entity.id = TaxPayer.id.value;
    entity.name = TaxPayer.name;
    entity.password = TaxPayer.password;
    entity.email = TaxPayer.email.value;
    entity.phoneNumber = TaxPayer.phoneNumber.value;
    entity.taxOfficeId = TaxPayer.taxOfficeId.value;
    entity.bankDetailId = TaxPayer.bankDetailId.value;
    entity.addressId = TaxPayer.addressId.value;
    entity.taxPayerStatus = TaxPayer.taxPayerStatus;

    return null;
  }
}
