import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';

import { DistrictId } from '../value-objects/district-id';
import { Ward } from './ward';

export class District extends BaseEntity<DistrictId> {
  name: string;

  wards = new Array<Ward>();

  constructor(districtId: DistrictId) {
    super(districtId);
  }
}
