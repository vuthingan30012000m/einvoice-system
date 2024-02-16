import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { AddressId } from '../value-objects/address-id';
import { WardId } from '../value-objects/ward-id';

export class Address extends AggregateRoot<AddressId> {
  note: string;
  wardId: WardId;




  constructor(addressId: AddressId) {
    super(addressId);
  }
}
