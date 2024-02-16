import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';

import { BankId } from '../value-objects/bank-id';

export class Bank extends BaseEntity<BankId> {
  bankName: string; 

  constructor(bankId: BankId) {
    super(bankId);
  }
}
