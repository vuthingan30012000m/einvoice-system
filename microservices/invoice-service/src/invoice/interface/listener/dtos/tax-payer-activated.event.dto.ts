import { Address } from '../../../core/domain/entities/address';
import { BankDetail } from '../../../core/domain/entities/bank-detail';
import { TaxPayer } from '../../../core/domain/entities/tax-payer';

export class TaxPayerActivatedEventDto {
  constructor(public readonly taxCode: string) {}
}
