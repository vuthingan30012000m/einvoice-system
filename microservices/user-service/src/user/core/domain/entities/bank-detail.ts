import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { BankDetailId } from '../value-objects/bank-detail-id';
import { BankInformation } from './bank-information';

export class BankDetail extends DomainEntity<BankDetailId> {
  accountBank: string;
  bankInformation: BankInformation;

  constructor(bankDetailId: BankDetailId) {
    super(bankDetailId);
  }
}
