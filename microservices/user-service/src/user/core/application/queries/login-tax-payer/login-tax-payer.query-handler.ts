import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginTaxPayerQuery } from './login-tax-payer.query';
import { TaxPayerRepository } from '../../ports/dataaccess/repositories/tax-payer.repository';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';

@QueryHandler(LoginTaxPayerQuery)
export class LoginTaxPayerQueryHandler
  implements IQueryHandler<LoginTaxPayerQuery>
{
  constructor(private readonly TaxPayerRepository: TaxPayerRepository) {}

  public async execute(payload: LoginTaxPayerQuery) {
    try {
      const existingEmail = await this.TaxPayerRepository.getOneByEmail(
        new Email(payload.email),
      );
      if (!existingEmail) {
        throw new TaxPayerException('Thông tin đăng nhập không đúng.');
      }

      if (existingEmail.password !== payload.password) {
        throw new TaxPayerException('Thông tin đăng nhập không đúng.');
      }

      return 'DDanwg nhap thanh cong';
      // if (existingEmail.taxPayerStatus === 'INACTIVE') {
      //   throw new TaxPayerException('Tài khoản của bạn đã bị khóa.');
      // }
      // if (existingEmail.taxPayerStatus === 'PENDING') {
      //   throw new TaxPayerException('Tài khoản của bạn đang chờ duyệt.');
      // }
      // if (existingEmail.taxPayerStatus === 'REJECTED') {
      //   throw new TaxPayerException('Tài khoản của bạn đã bị từ chối.');
      // }
      // f pending
      // Bạn đã gửi
      // if email
      //
    } catch (error) {
      return { error: error.message };
    }
  }
}
