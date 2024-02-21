import { DomainEntity } from '@vuvannghia/common';

import { CityId } from '../value-objects/city-id';

export class City extends DomainEntity<CityId> {
  name: string;

  constructor(cityId: CityId) {
    super(cityId);
  }
}
