import { BaseEntity } from '../../../../../common/core/domain/entities/base-entity';

import { WardId } from '../../value-objects/ward-id';

export class Ward extends BaseEntity<WardId> {
  name: string;


  constructor(wardId: WardId) {
    super(wardId);
  }
}
