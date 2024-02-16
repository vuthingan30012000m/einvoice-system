import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { CityId } from '../value-objects/city-id';

export class City extends AggregateRoot<CityId> {
  name: string;

  constructor(cityId: CityId) {
    super(cityId);
  }
}
