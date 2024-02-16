import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { BankId } from '../value-objects/bank-id';
import { BankInformation } from './bank-information';

export class Bank extends BaseEntity<BankId> {
  accountBank: string;
  bankInformation: BankInformation;

  constructor(bankId: BankId) {
    super(bankId);
  }

}
