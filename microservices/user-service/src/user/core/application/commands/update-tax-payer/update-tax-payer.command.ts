import { ICommand } from '@nestjs/cqrs';

export class UpdateTaxPayerCommand implements ICommand {
  constructor(public readonly payload: {}) {}
}
