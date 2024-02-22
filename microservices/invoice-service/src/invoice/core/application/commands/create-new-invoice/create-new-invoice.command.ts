import { ICommand } from "@nestjs/cqrs";

export class CreateNewInvoiceCommand implements ICommand {
  constructor(public readonly payload: {}) {}
}
