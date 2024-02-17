import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { BankDetailId } from '../value-objects/bank-detail-id';
import { Bank   } from './bank';

export class BankDetail extends DomainEntity<BankDetailId> {
  accountBank: string;
  bank: Bank ;

  constructor(bankDetailId: BankDetailId) {
    super(bankDetailId);
  }
}
