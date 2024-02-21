import { ICommand } from '@nestjs/cqrs';
import { TaxCode } from '../../../domain/value-objects/tax-code';

export class TaxPayerDeletedEventCommand implements ICommand {
  constructor(public readonly taxCode: TaxCode) {}
}
