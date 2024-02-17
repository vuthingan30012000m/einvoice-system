import { WardId } from './../value-objects/ward-id';
import { DomainEntity } from '../../../../common/ddd/oop/core/domain/entities/domain.entity';
import { AddressId } from '../value-objects/address-id';

export class Address extends DomainEntity<AddressId> {
  note: string;
  WardId: WardId;

  constructor(addressId: AddressId) {
    super(addressId);
  }
  static Builder(addressId: AddressId): AddressBuilder {
    return new AddressBuilder(addressId);
  }
}

class AddressBuilder{
  private address: Address;

  constructor(addressId: AddressId) {
    this.address = new Address(addressId);
  }

  withWardId(wardId: WardId): AddressBuilder {
    this.address.WardId = wardId;
    return this;
  }

  withNoteAddress(note: string): AddressBuilder {
    this.address.note = note;
    return this;
  }

  build(): Address {
    return this.address;
  }
}
