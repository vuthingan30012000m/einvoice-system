import { SellerId } from '../value-objects/seller-id';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone-number';
import { AddressId } from '../value-objects/address-id';
import { BankDetailId } from '../value-objects/bank-detail-id';

export class Seller {
  sellerId: SellerId;

  name: string;
  email: Email;
  phoneNumber: PhoneNumber;

  addressId: AddressId;
  bankDetailId: BankDetailId;

  constructor(sellerId: SellerId) {
    this.sellerId = sellerId;
  }

  static Builder(sellerId: SellerId): SellerBuilder {
    return new SellerBuilder(sellerId);
  }
}

class SellerBuilder {
  private seller: Seller;

  constructor(sellerId: SellerId) {
    this.seller = new Seller(sellerId);
  }
  withName(name: string): SellerBuilder {
    this.seller.name = name;
    return this;
  }
  withEmail(email: Email): SellerBuilder {
    this.seller.email = email;
    return this;
  }
  withPhoneNumber(phoneNumber: PhoneNumber): SellerBuilder {
    this.seller.phoneNumber = phoneNumber;
    return this;
  }
  withAddressId(addressId: AddressId): SellerBuilder {
    this.seller.addressId = addressId;
    return this;
  }
  withBankDetailId(bankDetailId: BankDetailId): SellerBuilder {
    this.seller.bankDetailId = bankDetailId;
    return this;
  }
  build(): Seller {
    return this.seller;
  }
}
