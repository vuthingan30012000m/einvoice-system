import { ICommand } from "@nestjs/cqrs";

export class TaxPayerRegisteredEventCommand implements ICommand {
  constructor(public readonly payload: {}) {}
}
