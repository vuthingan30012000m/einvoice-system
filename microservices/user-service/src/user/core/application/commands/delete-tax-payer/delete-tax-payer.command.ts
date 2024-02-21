import { TaxCode } from '../../../domain/value-objects/tax-code';
import { ICommand } from '@nestjs/cqrs';

export class DeleteTaxPayerCommand implements ICommand {
  constructor(
    public readonly taxCode: string,
    public readonly usbToken: string,
  ) {}
}
