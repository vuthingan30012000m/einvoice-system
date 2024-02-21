import { ICommand } from "@nestjs/cqrs";

export class TaxPayerUpdatedEventCommand implements ICommand {
  constructor(public readonly payload: {}) {}
}
