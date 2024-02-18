import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginTaxPayerQuery } from './login-tax-payer.query';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';
import * as bcryptjs from 'bcryptjs';
import { TaxPayerStatus } from 'src/user/core/domain/value-objects/tax-payer-status';

@QueryHandler(LoginTaxPayerQuery)
export class LoginTaxPayerQueryHandler
  implements IQueryHandler<LoginTaxPayerQuery>
{
  constructor(private readonly TaxPayerRepository: TaxPayerRepositoryPort) {}

  public async execute(payload: LoginTaxPayerQuery) {
    try {
      const existingEmail = await this.TaxPayerRepository.getOneByEmail(
        new Email(payload.email),
      );
      if (!existingEmail) {
        throw new TaxPayerException('Thông tin đăng nhập không đúng.');
      }

      if (!(await bcryptjs.compare(payload.password, existingEmail.password))) {
        throw new TaxPayerException('Thông tin đăng nhập không đúng.');
      }

      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      // if
      if (existingEmail.taxPayerStatus != TaxPayerStatus.ACTIVE) {
        throw new TaxPayerException('Đăng nhập không thành công.');
      }

      return 'Đăng nhập thành công';
    } catch (error) {
      return { error: error.message };
    }
  }
}
