import { ICommand } from '@nestjs/cqrs';

import { Address } from './../entities/address';
import { BankDetail } from './../entities/bank-detail';
import { TaxPayer } from './../entities/tax-payer';

export class RegisterTaxPayerCommand implements ICommand {
  constructor(
    public readonly newAddress: Address,
    public readonly newBankDetail: BankDetail,
    public readonly newTaxPayer: TaxPayer,
  ) {}
}
