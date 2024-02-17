import { DomainEntity } from '../../../../common/core/domain/entities/domain.entity';
import { BankInformationId } from '../value-objects/bank-information-id';

export class BankInformation extends DomainEntity<BankInformationId> {
  name: string;

  code: string;

  shortName: string;

  constructor(bankInformationId: BankInformationId) {
    super(bankInformationId);
  }
}
