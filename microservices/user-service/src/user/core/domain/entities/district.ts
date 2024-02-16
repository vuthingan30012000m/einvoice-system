import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { CityId } from '../value-objects/city-id';
import { DistrictId } from '../value-objects/district-id';

export class District extends AggregateRoot<DistrictId> {
  name: string;
  cityId: CityId;

  constructor(districtId: DistrictId) {
    super(districtId);
  }
}
