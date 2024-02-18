import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailTaxPayerCommand } from './verify-email-tax-payer.command';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import * as crypto from 'crypto';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';

@CommandHandler(VerifyEmailTaxPayerCommand)
export class VerifyEmailTaxPayerCommandHandler
  implements ICommandHandler<VerifyEmailTaxPayerCommand>
{
  constructor(private readonly TaxPayerRepository: TaxPayerRepositoryPort) {}

  private readonly logger = new Logger(VerifyEmailTaxPayerCommandHandler.name);

  decryptEmail(encryptedEmail: string, secretKey: string): string {
    const iv = Buffer.from(encryptedEmail.slice(0, 32), 'hex');
    const encryptedText = encryptedEmail.slice(32);
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(secretKey),
      iv,
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  public async execute(payload: VerifyEmailTaxPayerCommand) {
    try {
      this.logger.log(
        `> VerifyEmailTaxPayerCommand: ${JSON.stringify(payload)}`,
      );
      const email = this.decryptEmail(
        payload.token,
        process.env['VERIFY_EMAIL_SECRET'],
      );

      const taxPayer = await this.TaxPayerRepository.getOneByEmail(
        new Email(email),
      );
      if (!taxPayer) {
        throw new TaxPayerException('Người nộp thuế không tồn tại.');
      }

      taxPayer.verifyEmail();

      await this.TaxPayerRepository.save(taxPayer);

      return payload;
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { error: error.message };
    }
  }
}
