import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginTaxPayerQuery } from './login-tax-payer.query';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';
import { TaxPayerStatus } from 'src/user/core/domain/value-objects/tax-payer-status';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { Logger } from '@nestjs/common';
import { HashPasswordService } from 'src/user/core/domain/services/hash-password.service';
import { JwtService } from '@nestjs/jwt';

@QueryHandler(LoginTaxPayerQuery)
export class LoginTaxPayerQueryHandler
  implements IQueryHandler<LoginTaxPayerQuery>
{
  private readonly logger = new Logger(LoginTaxPayerQueryHandler.name);

  constructor(
    private readonly JwtService: JwtService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly HashPasswordService: HashPasswordService,
  ) {}

  public async execute(payload: LoginTaxPayerQuery) {
    try {
      this.logger.debug(`> LoginTaxPayerQuery: ${JSON.stringify(payload)}`);

      const existingTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.taxCode),
      );
      if (!existingTaxPayer) {
        throw new TaxPayerException('Thông tin đăng nhập không đúng.');
      }

      if (
        !(await this.HashPasswordService.compare(
          existingTaxPayer.password,
          payload.password,
        ))
      ) {
        throw new TaxPayerException('Thông tin đăng nhập không đúng.');
      }

      if (existingTaxPayer.taxPayerStatus === TaxPayerStatus.VERIFY_EMAIL) {
        throw new TaxPayerException('Hãy thực hiện  xác thực email.');
      }

      // if (existingTaxPayer.taxPayerStatus === TaxPayerStatus.REGISTER_USB_TOKEN) {
      //   throw new TaxPayerException('Hãy thực hiện  xác thực email.');
      // }

      if (existingTaxPayer.taxPayerStatus === TaxPayerStatus.DELETED) {
        throw new TaxPayerException('Tài khoản     đã bị xóa.');
      }

      const accessToken = await this.JwtService.signAsync({
        taxCode: existingTaxPayer.id.value,
        // statusTaxPayer: existingTaxPayer.taxPayerStatus,
      });

      return accessToken;
    } catch (error) {
      return { error: error.message };
    }
  }
}
