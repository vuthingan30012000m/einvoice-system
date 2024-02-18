import { TaxCode } from './../../../domain/value-objects/tax-code';
import { IQuery } from '@nestjs/cqrs';

export class LoginTaxPayerQuery implements IQuery {
  constructor(
    public readonly taxCode: string,
    public readonly password: string,
  ) {}
}
