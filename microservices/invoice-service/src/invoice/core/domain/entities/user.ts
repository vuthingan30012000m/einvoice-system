import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { UserId } from '../value-objects/user-id';

export class User extends BaseEntity<UserId> {
  nameUser: string;

  constructor(UserId: UserId) {
    super(UserId);
  }
}
