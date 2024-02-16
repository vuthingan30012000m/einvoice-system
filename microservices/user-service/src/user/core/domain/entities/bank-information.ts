import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';
import { BankInformationId } from '../value-objects/temp/bank-information-id';
import { Bank } from './bank';

export class BankInformation extends BaseEntity<BankInformationId> {
  name: string;

  code: string;

  shortName: string;

  Banks = new Array<Bank>();

  constructor(bankInformationId: BankInformationId) {
    super(bankInformationId);
  }
}
