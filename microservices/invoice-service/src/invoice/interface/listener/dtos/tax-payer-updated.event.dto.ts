import { Address } from '../../../core/domain/entities/address';
import { BankDetail } from '../../../core/domain/entities/bank-detail';
import { TaxPayer } from '../../../core/domain/entities/tax-payer';

export class TaxPayerUpdatedEventDto {
  constructor(
    public readonly newAddress: Address,
    public readonly newBankDetail: BankDetail,
    public readonly newTaxPayer: TaxPayer,
  ) {}
}
