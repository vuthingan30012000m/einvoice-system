import { BankId } from './../value-objects/bank-id';
import { DomainEntity } from '../../../../common/ddd/oop/core/domain/entities/domain.entity';
import { BankDetailId } from '../value-objects/bank-detail-id';

export class BankDetail extends DomainEntity<BankDetailId> {
  accountBank: string;
  BankId: BankId;

  constructor(bankDetailId: BankDetailId) {
    super(bankDetailId);
  }
}
