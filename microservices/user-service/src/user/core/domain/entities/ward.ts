import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { DistrictId } from '../value-objects/district-id';
import { WardId } from '../value-objects/ward-id';

export class Ward extends AggregateRoot<WardId> {
  name: string;
  districtId: DistrictId;

  constructor(wardId: WardId) {
    super(wardId);
  }
}
