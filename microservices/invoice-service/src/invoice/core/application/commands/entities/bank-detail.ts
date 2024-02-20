import { BankId } from './../value-objects/bank-id';
import { DomainEntity } from '../../../../common/ddd/oop/core/domain/entities/domain.entity';
import { BankDetailId } from '../value-objects/bank-detail-id';

export class BankDetail extends DomainEntity<BankDetailId> {
  accountBank: string;
  BankId: BankId;

  constructor(bankDetailId: BankDetailId) {
    super(bankDetailId);
  }

  static Builder(bankDetailId: BankDetailId): BankDetailBuilder {
    return new BankDetailBuilder(bankDetailId);
  }
}

class BankDetailBuilder {
  private bankDetail: BankDetail;

  constructor(bankDetailId: BankDetailId) {
    this.bankDetail = new BankDetail(bankDetailId);
  }

  withAccountBank(accountBank: string): BankDetailBuilder {
    this.bankDetail.accountBank = accountBank;
    return this;
  }

  withBankId(bankId: BankId): BankDetailBuilder {
    this.bankDetail.BankId = bankId;
    return this;
  }

  build(): BankDetail {
    return this.bankDetail;
  }
}
