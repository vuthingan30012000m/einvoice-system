import { BaseEntity } from '../../../../../common/core/domain/entities/base-entity';

import { DistrictId } from '../../value-objects/district-id';

export class District extends BaseEntity<DistrictId> {
  name: string;


  constructor(districtId: DistrictId) {
    super(districtId);
  }
}
