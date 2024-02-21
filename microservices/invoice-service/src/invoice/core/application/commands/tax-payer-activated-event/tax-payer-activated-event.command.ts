import { ICommand } from '@nestjs/cqrs';
import { TaxCode } from '../../../domain/value-objects/tax-code';

export class TaxPayerActivatedEventCommand implements ICommand {
  constructor(
    public readonly taxCode: TaxCode,
    public readonly usbToken: string,
  ) {}
}
