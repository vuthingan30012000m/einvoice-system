import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailTaxPayerCommand } from './verify-email-tax-payer.command';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import * as crypto from 'crypto';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(VerifyEmailTaxPayerCommand)
export class VerifyEmailTaxPayerCommandHandler
  implements ICommandHandler<VerifyEmailTaxPayerCommand>
{
  constructor(
    private readonly JwtService: JwtService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
  ) {}

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
        payload.tokenEmail,
        process.env['VERIFY_EMAIL_SECRET'],
      );

      const findTaxPayer = await this.TaxPayerRepository.getOneByEmail(
        new Email(email),
      );
      if (!findTaxPayer) {
        throw new TaxPayerException('Người nộp thuế không tồn tại.');
      }

      findTaxPayer.verifyEmail();

      await this.TaxPayerRepository.save(findTaxPayer);

      const accessToken = await this.JwtService.signAsync({
        taxCode: findTaxPayer.id.value,
        statusTaxPayer: findTaxPayer.taxPayerStatus,
      });

      return { accessToken };
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { error: error.message };
    }
  }
}
