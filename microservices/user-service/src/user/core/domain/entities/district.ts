import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { DistrictId } from '../value-objects/district-id';
import { City } from './city';

export class District extends BaseEntity<DistrictId> {
  name: string;
  city: City;

  constructor(districtId: DistrictId) {
    super(districtId);
  }
}
