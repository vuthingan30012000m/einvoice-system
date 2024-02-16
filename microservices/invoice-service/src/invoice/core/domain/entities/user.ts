import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { UserId } from '../value-objects/user-id';

// Customer
export class User extends BaseEntity<UserId> {
  nameUser: string;
  nameTaxPayer: string;
  // name String
  // email String
  // phoneNumber String
  // addressId Int
  // bankId String
  constructor(UserId: UserId) {
    super(UserId);
  }
}
