import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { CityId } from '../value-objects/city-id';

export class City extends BaseEntity<CityId> {
  name: string;

  constructor(cityId: CityId) {
    super(cityId);
  }
}
