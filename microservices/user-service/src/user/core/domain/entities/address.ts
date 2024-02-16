import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';

import { AddressId } from '../value-objects/address-id';

export class Address extends BaseEntity<AddressId> {
  note: string;

  constructor(addressId: AddressId) {
    super(addressId);
  }
}
