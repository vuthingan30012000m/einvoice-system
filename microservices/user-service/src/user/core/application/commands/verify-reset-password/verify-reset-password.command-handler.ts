import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyResetPasswordCommand } from './verify-reset-password.command';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';
import { EncryptionEmailService } from 'src/user/core/domain/services/encryption-email.service';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';

import { Email } from '../../../domain/value-objects/email';
import { TaxPayerStatus } from '../../../domain/value-objects/tax-payer-status';

import * as faker from 'faker';
import { HashPasswordService } from '../../../domain/services/hash-password.service';

@CommandHandler(VerifyResetPasswordCommand)
export class VerifyResetPasswordCommandHandler
  implements ICommandHandler<VerifyResetPasswordCommand>
{
  constructor(
    private readonly HashPasswordService: HashPasswordService,
    private readonly EncryptionEmailService: EncryptionEmailService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
  ) {}

  private readonly logger = new Logger(VerifyResetPasswordCommandHandler.name);

  public async execute(payload: VerifyResetPasswordCommand) {
    try {
      this.logger.log(
        `> VerifyResetPasswordCommand: ${JSON.stringify(payload)}`,
      );

      const payloadDecrypt = this.EncryptionEmailService.decrypt(
        payload.tokenPassword,
        process.env.VERIFY_RESET_PASSWORD_SECRET,
      );

      const [email, dateRequest] = payloadDecrypt.split(' ');

      if (new Date(dateRequest) < new Date(new Date().getTime() - 60 * 1000)) {
        throw new TaxPayerException('Yêu cầu khôi phục mật khẩu hết hạn');
      }

      const findTaxPayer = await this.TaxPayerRepository.getOneByEmail(
        new Email(email),
      );
      if (!findTaxPayer) {
        throw new TaxPayerException('Không tìm thấy thông tin người nộp thuế.');
      }

      const newPassword = faker.internet.password();

      const hashPassword = await this.HashPasswordService.hash(newPassword);

      findTaxPayer.resetPassword(hashPassword);

      await this.TaxPayerRepository.save(findTaxPayer);

      return { newPassword };
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
