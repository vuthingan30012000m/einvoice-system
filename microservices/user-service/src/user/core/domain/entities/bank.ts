import { AggregateRoot } from '../../../../common/core/domain/entities/aggregate-root';
import { BankBuilder } from '../factories/bank.factory';
import { BankId } from '../value-objects/bank-id';
import { BankInformationId } from '../value-objects/bank-information-id';

export class Bank extends AggregateRoot<BankId> {
  accountBank    : string;
  bankInformationId    : BankInformationId;




  constructor(bankId: BankId) {
    super(bankId);
  }
  
  static Builder(bankId: BankId): BankBuilder {
    return new BankBuilder(bankId);
  }
}
