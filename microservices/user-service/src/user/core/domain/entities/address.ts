import { WardId } from './../value-objects/ward-id';
import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { AddressId } from '../value-objects/address-id';

export class Address extends DomainEntity<AddressId> {
  note: string;
  WardId: WardId;

  constructor(addressId: AddressId) {
    super(addressId);
  }
}
