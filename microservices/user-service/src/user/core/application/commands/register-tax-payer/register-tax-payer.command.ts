import { ICommand } from "@nestjs/cqrs";

export class RegisterTaxPayerCommand implements ICommand {
  constructor(public readonly name: string) {}
}
