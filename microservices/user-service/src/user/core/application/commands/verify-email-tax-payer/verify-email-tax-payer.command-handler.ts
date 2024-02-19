import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailTaxPayerCommand } from './verify-email-tax-payer.command';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';
import { EncryptionEmailService } from 'src/user/core/domain/services/encryption-email.service';

@CommandHandler(VerifyEmailTaxPayerCommand)
export class VerifyEmailTaxPayerCommandHandler
  implements ICommandHandler<VerifyEmailTaxPayerCommand>
{
  constructor(
    private readonly EncryptionEmailService: EncryptionEmailService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
  ) {}

  private readonly logger = new Logger(VerifyEmailTaxPayerCommandHandler.name);

  public async execute(payload: VerifyEmailTaxPayerCommand) {
    try {
      this.logger.log(
        `> VerifyEmailTaxPayerCommand: ${JSON.stringify(payload)}`,
      );
      const email = this.EncryptionEmailService.decrypt(
        payload.tokenEmail,
        process.env.VERIFY_EMAIL_SECRET,
      );

      const findTaxPayer = await this.TaxPayerRepository.getOneByEmail(
        new Email(email),
      );
      if (!findTaxPayer) {
        throw new TaxPayerException('Người nộp thuế không tồn tại.');
      }

      findTaxPayer.verifyEmail();

      await this.TaxPayerRepository.save(findTaxPayer);

      return {
        message: 'Xác thực email thành công.',
      };
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
