import { DomainEntity } from '../../../../common/ddd/oop/core/domain/entities/domain.entity';

import { BankId } from '../value-objects/bank-id';

export class Bank extends DomainEntity<BankId> {
  name: string;
  code: string;
  shortName: string;

  constructor(bankId: BankId) {
    super(bankId);
  }
}
