import { BankId } from './../value-objects/bank-id';
import { AddressId } from './../value-objects/address-id';
import { PhoneNumber } from './../value-objects/phone-number';
import { Email } from './../value-objects/email';
import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { SellerId } from '../value-objects/seller-id';

export class Seller extends BaseEntity<SellerId> {
  name: string;
  email: Email;
  phoneNumber: PhoneNumber;

  addressId: AddressId;
  bankId: BankId;

  constructor(sellerId: SellerId) {
    super(sellerId);
  }
}
