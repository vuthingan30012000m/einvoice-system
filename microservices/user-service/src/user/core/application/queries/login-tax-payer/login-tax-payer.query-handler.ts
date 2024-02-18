import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginTaxPayerQuery } from './login-tax-payer.query';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';
import * as bcryptjs from 'bcryptjs';
import { TaxPayerStatus } from 'src/user/core/domain/value-objects/tax-payer-status';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';

@QueryHandler(LoginTaxPayerQuery)
export class LoginTaxPayerQueryHandler
  implements IQueryHandler<LoginTaxPayerQuery>
{
  constructor(private readonly TaxPayerRepository: TaxPayerRepositoryPort) {}

  public async execute(payload: LoginTaxPayerQuery) {
    try {
      const existingTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.taxCode),
      );
      if (!existingTaxPayer) {
        throw new TaxPayerException('Thông tin đăng nhập không đúng.');
      }

      if (
        !(await bcryptjs.compare(payload.password, existingTaxPayer.password))
      ) {
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
      if (existingTaxPayer.taxPayerStatus != TaxPayerStatus.ACTIVE) {
        throw new TaxPayerException('Đăng nhập không thành công.');
      }

      return 'Đăng nhập thành công';
    } catch (error) {
      return { error: error.message };
    }
  }
}
