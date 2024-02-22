import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginTaxPayerQuery } from './login-tax-payer.query';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { Email } from '../../../domain/value-objects/email';
import { TaxPayerException } from '../../../domain/exceptions/tax-payer.exception';
import { TaxPayerStatus } from '../../../domain/value-objects/tax-payer-status';
import { TaxCode } from '../../../domain/value-objects/tax-code';
import { Logger } from '@nestjs/common';
import { HashPasswordService } from '../../../domain/services/hash-password.service';
import { JwtService } from '@nestjs/jwt';
import { UsbTokenAuthenticationService } from '../../../domain/services/usb-token-authentication.service';

@QueryHandler(LoginTaxPayerQuery)
export class LoginTaxPayerQueryHandler
  implements IQueryHandler<LoginTaxPayerQuery>
{
  private readonly logger = new Logger(LoginTaxPayerQueryHandler.name);

  constructor(
    private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationService,
    private readonly JwtService: JwtService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly HashPasswordService: HashPasswordService,
  ) {}

  public async execute(payload: LoginTaxPayerQuery) {
    try {
      this.logger.debug(`> payload: ${JSON.stringify(payload)}`);

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
        throw new TaxPayerException('Hãy thực hiện xác thực email.');
      }

      if (existingTaxPayer.isUsbToken) {
        const isValid = await this.UsbTokenAuthenticationService.verify(
          payload.usbToken,
          existingTaxPayer.usbToken,
        );

        if (!isValid) {
          throw new TaxPayerException('Chữ ký số không đúng.');
        }
      }

      if (existingTaxPayer.taxPayerStatus === TaxPayerStatus.DELETED) {
        throw new TaxPayerException('Tài khoản đã bị xóa.');
      }

      const accessToken = await this.JwtService.signAsync({
        taxCode: existingTaxPayer.taxCode.value,
      });

      return accessToken;
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
