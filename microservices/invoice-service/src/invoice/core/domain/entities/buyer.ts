import { BuyerId } from '../value-objects/buyer-id';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { AddressId } from '../value-objects/address-id';
import { BankDetailId } from '../value-objects/bank-detail-id';

export class Buyer {
  buyerId: BuyerId;

  name: string;
  email: Email;
  phoneNumber: PhoneNumber;

  addressId: AddressId;
  bankDetailId: BankDetailId;

  constructor(buyerId: BuyerId) {
    this.buyerId = buyerId;
  }

  static Builder(buyerId: BuyerId): BuyerBuilder {
    return new BuyerBuilder(buyerId);
  }
}

class BuyerBuilder {
  private Buyer: Buyer;

  constructor(buyerId: BuyerId) {
    this.Buyer = new Buyer(buyerId);
  }
  withName(name: string): BuyerBuilder {
    this.Buyer.name = name;
    return this;
  }
  withEmail(email: Email): BuyerBuilder {
    this.Buyer.email = email;
    return this;
  }
  withPhoneNumber(phoneNumber: PhoneNumber): BuyerBuilder {
    this.Buyer.phoneNumber = phoneNumber;
    return this;
  }
  withAddressId(addressId: AddressId): BuyerBuilder {
    this.Buyer.addressId = addressId;
    return this;
  }
  withBankDetailId(bankDetailId: BankDetailId): BuyerBuilder {
    this.Buyer.bankDetailId = bankDetailId;
    return this;
  }
  build(): Buyer {
    return this.Buyer;
  }
}
