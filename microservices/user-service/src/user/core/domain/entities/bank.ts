import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { BankId } from '../value-objects/temp/bank-id';

export class Bank extends BaseEntity<BankId> {
  nameBank: string;

  constructor(bankId: BankId) {
    super(bankId);
  }
}
