import { BankDetail } from './../../../core/domain/entities/bank-detail';
import { TaxPayerEntity } from '../entities/tax-payer.entity';
import { TaxPayer } from 'src/user/core/domain/entities/tax-payer';

import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { Email } from 'src/user/core/domain/value-objects/email';
import { PhoneNumber } from 'src/user/core/domain/value-objects/phone-number';
import { TaxOfficeId } from 'src/user/core/domain/value-objects/tax-office-id';
import { BankDetailId } from 'src/user/core/domain/value-objects/bank-detail-id';
import { AddressId } from 'src/user/core/domain/value-objects/address-id';
import { TaxOfficeEntity } from '../entities/tax-office.entity';
import { BankDetailEntity } from '../entities/bank-detail.entity';
import { AddressEntity } from '../entities/address.entity';

export class TaxPayerAdapter {
  static toDomain(TaxPayerEntity: TaxPayerEntity): TaxPayer {
    console.log("🚀 ~ TaxPayerAdapter ~ toDomain ~ TaxPayerEntity:", TaxPayerEntity)
    if (!TaxPayerEntity) return null;

    const TaxPayerModel = TaxPayer.Builder(new TaxCode(TaxPayerEntity.id))
      .withName(TaxPayerEntity.name)
      .withPassword(TaxPayerEntity.password)
      .withEmail(new Email(TaxPayerEntity.email))
      .withPhoneNumber(new PhoneNumber(TaxPayerEntity.phoneNumber))
      .withTaxOfficeId(new TaxOfficeId(TaxPayerEntity.taxOffice.id))
      .withBankDetailId(new BankDetailId(TaxPayerEntity.bankDetail.id))
      .withAddressId(new AddressId(TaxPayerEntity.address.id))
      .withTaxPayerStatus(TaxPayerEntity.taxPayerStatus )
      .build();

    return TaxPayerModel;
  }

  static toPersistence(TaxPayer: TaxPayer): TaxPayerEntity {
    console.log("🚀 ~ TaxPayerAdapter ~ toPersistence ~ TaxPayer:", TaxPayer)
    if (!TaxPayer) return null;

    const entity = new TaxPayerEntity();

    entity.id = TaxPayer.id.value;
    entity.name = TaxPayer.name;
    entity.password = TaxPayer.password;
    entity.email = TaxPayer.email.value;
    entity.phoneNumber = TaxPayer.phoneNumber.value;

    const TaxOffice = new TaxOfficeEntity();
    TaxOffice.id = TaxPayer.taxOfficeId.value;
    entity.taxOffice = TaxOffice;

    const BankDetail = new BankDetailEntity();
    BankDetail.id = TaxPayer.bankDetailId.value;
    entity.bankDetail = BankDetail;

    const Address = new AddressEntity();
    Address.id = TaxPayer.addressId.value;
    entity.address = Address;

    entity.taxPayerStatus = TaxPayer.taxPayerStatus;

    return entity;
  }
}
