import { DomainEntity } from '@vuvannghia/common';

import { BankId } from '../value-objects/bank-id';

export class Bank extends DomainEntity<BankId> {
  name: string;
  code: string;
  shortName: string;

  constructor(bankId: BankId) {
    super(bankId);
  }
}
