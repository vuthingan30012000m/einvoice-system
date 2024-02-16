import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';

import { CityId } from '../value-objects/city-id';
import { District } from './district';

export class City extends BaseEntity<CityId> {
  name: string;

  districts = new Array<District>();

  constructor(cityId: CityId) {
    super(cityId);
  }
}
