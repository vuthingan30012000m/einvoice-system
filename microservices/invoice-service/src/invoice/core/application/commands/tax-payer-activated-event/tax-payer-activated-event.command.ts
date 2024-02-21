import { ICommand } from "@nestjs/cqrs";

export class TaxPayerActivatedEventCommand implements ICommand {
  constructor(public readonly payload: {}) {}
}
