import { TaxCode } from '../../../core/domain/value-objects/tax-code';

export class FindTaxPayerDto {
  constructor(public readonly taxCode: TaxCode) {}
}
