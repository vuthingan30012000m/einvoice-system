import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { BankId } from '../value-objects/bank-id';
import { BankInformation } from './bank-information';

export class Bank extends DomainEntity<BankId> {
  accountBank: string;
  bankInformation: BankInformation;

  constructor(bankId: BankId) {
    super(bankId);
  }
}
