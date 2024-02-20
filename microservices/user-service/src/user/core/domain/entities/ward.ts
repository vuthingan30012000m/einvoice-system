import { DomainEntity } from '@vuvannghia/common';

import { DistrictId } from '../value-objects/district-id';
import { WardId } from '../value-objects/ward-id';

export class Ward extends DomainEntity<WardId> {
  name: string;
  districtId: DistrictId;

  constructor(wardId: WardId) {
    super(wardId);
  }
}
