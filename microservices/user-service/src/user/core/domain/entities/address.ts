import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { AddressId } from '../value-objects/address-id';
import { Ward } from './ward';

export class Address extends DomainEntity<AddressId> {
  note: string;
  ward: Ward;

  constructor(addressId: AddressId) {
    super(addressId);
  }
}
