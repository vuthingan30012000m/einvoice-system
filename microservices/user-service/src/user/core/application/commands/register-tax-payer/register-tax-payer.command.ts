import { ICommand } from "@nestjs/cqrs";

export class RegisterTaxPayerCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly name: string,
    public readonly name: string,
    ) {}
}
  // readonly name: string;
  // readonly password: string;
  // readonly         email: string;
  // readonly         phoneNumber: string;
  // readonly          taxOfficeId: string;
  // readonly         BankId: string;
  // readonly         accountBank: string;
  // readonly         wardId: string;
  // readonly         note: string;
