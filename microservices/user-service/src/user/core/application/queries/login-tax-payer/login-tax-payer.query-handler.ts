import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginTaxPayerPort } from './login-tax-payer.port';
import {
  LoginTaxPayerQuery,
  LoginTaxPayerQueryResult,
} from './login-tax-payer.query';

@QueryHandler(LoginTaxPayerQuery)
export class LoginTaxPayerQueryHandler
  implements IQueryHandler<LoginTaxPayerQuery>
{
  constructor(private readonly loginTaxPayerPort: LoginTaxPayerPort) {}

  public async execute({ payload }: LoginTaxPayerQuery): Promise<void> {}
}
