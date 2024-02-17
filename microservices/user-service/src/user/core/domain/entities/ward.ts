import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { WardId } from '../value-objects/ward-id';
import { District } from './district';

export class Ward extends DomainEntity<WardId> {
  name: string;
  district: District;

  constructor(wardId: WardId) {
    super(wardId);
  }
}
