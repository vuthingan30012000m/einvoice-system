import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { AddressId } from '../value-objects/address-id';
import { Ward } from './ward';

export class Address extends BaseEntity<AddressId> {
  note: string;
  ward: Ward;

  constructor(addressId: AddressId) {
    super(addressId);
  }
}
