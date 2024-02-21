import { TaxCode } from '../../../core/domain/value-objects/tax-code';

export class TaxPayerActivatedEventDto {
  constructor(
    public readonly taxCode: TaxCode,
    public readonly usbToken: string,
  ) {}
}
