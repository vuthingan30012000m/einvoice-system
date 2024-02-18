import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginTaxPayerQuery } from './login-tax-payer.query';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';
import { TaxPayerStatus } from 'src/user/core/domain/value-objects/tax-payer-status';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { Logger } from '@nestjs/common';

@QueryHandler(LoginTaxPayerQuery)
export class LoginTaxPayerQueryHandler
  implements IQueryHandler<LoginTaxPayerQuery>
{
  private readonly logger = new Logger(LoginTaxPayerQueryHandler.name);

  constructor(private readonly TaxPayerRepository: TaxPayerRepositoryPort) {}

  public async execute(payload: LoginTaxPayerQuery) {
    try {
      this.logger.debug(
        `> TaxPayerRegisteredEvent: ${JSON.stringify(payload)}`,
      );

      const existingTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.taxCode),
      );
      if (!existingTaxPayer) {
        throw new TaxPayerException('Thông tin đăng nhập không đúng.');
      }

      if (
        !(await this.comparePasswords(
          existingTaxPayer.password,
          payload.password,
        ))
      ) {
        throw new TaxPayerException('Thông tin đăng nhập không đúng.');
      }

      if (existingTaxPayer.taxPayerStatus === TaxPayerStatus.PENDING) {
        throw new TaxPayerException('Hãy xác thực email.');
      }

      if (existingTaxPayer.taxPayerStatus === TaxPayerStatus.VERIFY_EMAIL) {
        throw new TaxPayerException(
          'Hãy thực hiện đăng ký chữ ký số USB Token.',
        );
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
