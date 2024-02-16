import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { WardId } from '../value-objects/ward-id';
import { District } from './district';

export class Ward extends BaseEntity<WardId> {
  name: string;
  district: District;

  constructor(wardId: WardId) {
    super(wardId);
  }
}
