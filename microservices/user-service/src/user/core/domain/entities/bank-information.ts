import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { BankInformationId } from '../value-objects/bank-information-id';

export class BankInformation extends BaseEntity<BankInformationId> {
  name: string;

  code: string;

  shortName: string;

  constructor(bankInformationId: BankInformationId) {
    super(bankInformationId);
  }
}
