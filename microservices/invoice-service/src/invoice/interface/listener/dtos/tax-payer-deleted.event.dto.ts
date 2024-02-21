import { TaxCode } from '../../../core/domain/value-objects/tax-code';

export class TaxPayerDeletedEventDto {
  constructor(public readonly taxCode: TaxCode) {}
}
