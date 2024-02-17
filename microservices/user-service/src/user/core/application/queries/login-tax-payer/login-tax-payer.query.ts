import { IQuery } from '@nestjs/cqrs';

export class LoginTaxPayerQuery implements IQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
