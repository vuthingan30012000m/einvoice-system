import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { CustomerId } from '../value-objects/customer-id';

export class Customer extends BaseEntity<CustomerId> {
  nameCustomer: string;

  constructor(CustomerId: CustomerId) {
    super(CustomerId);
  }
}
