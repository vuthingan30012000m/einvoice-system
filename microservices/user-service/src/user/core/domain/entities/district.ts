import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { DistrictId } from '../value-objects/district-id';
import { City } from './city';

export class District extends DomainEntity<DistrictId> {
  name: string;
  city: City;

  constructor(districtId: DistrictId) {
    super(districtId);
  }
}
