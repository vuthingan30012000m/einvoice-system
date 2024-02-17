import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { CityId } from '../value-objects/city-id';

export class City extends DomainEntity<CityId> {
  name: string;

  constructor(cityId: CityId) {
    super(cityId);
  }
}
