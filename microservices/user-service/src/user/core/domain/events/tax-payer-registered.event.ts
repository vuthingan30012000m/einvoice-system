import { TaxPayer } from './../entities/tax-payer';
export class TaxPayerRegisteredEvent {
  constructor(public readonly TaxPayer: TaxPayer) {}
}
