import { CityId } from './../value-objects/city-id';
import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { DistrictId } from '../value-objects/district-id';

export class District extends DomainEntity<DistrictId> {
  name: string;
  CityId: CityId;

  constructor(districtId: DistrictId) {
    super(districtId);
  }
}
