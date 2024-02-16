import { BaseEntity } from '../../../../../common/core/domain/entities/base-entity';

import { WardId } from '../../value-objects/ward-id';
import { Address } from './address';

export class Ward extends BaseEntity<WardId> {
  name: string;

  addresses = new Array<Address>();

  constructor(wardId: WardId) {
    super(wardId);
  }
}
