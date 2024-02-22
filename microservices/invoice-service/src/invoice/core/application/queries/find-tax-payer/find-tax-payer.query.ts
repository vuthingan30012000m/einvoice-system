import { IQuery, IQueryResult } from '@nestjs/cqrs';
import { TaxCode } from '../../../domain/value-objects/tax-code';

export class FindTaxPayerQuery implements IQuery {
  constructor(public readonly taxCode: TaxCode) {}
}
