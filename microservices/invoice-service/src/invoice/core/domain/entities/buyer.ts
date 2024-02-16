import { BankId } from '../value-objects/bank-id';
import { AddressId } from '../value-objects/address-id';
import { PhoneNumber } from '../value-objects/phone-number';
import { Email } from '../value-objects/email';
import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { BuyerId } from '../value-objects/buyer-id';

export class Buyer extends BaseEntity<BuyerId> {
  name: string;
  email: Email;
  phoneNumber: PhoneNumber;

  addressId: AddressId;
  bankId: BankId;

  constructor(BuyerId: BuyerId) {
    super(BuyerId);
  }
}
