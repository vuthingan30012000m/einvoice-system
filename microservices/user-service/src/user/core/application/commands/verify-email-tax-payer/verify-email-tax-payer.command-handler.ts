import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailTaxPayerCommand } from './verify-email-tax-payer.command';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';

@CommandHandler(VerifyEmailTaxPayerCommand)
export class VerifyEmailTaxPayerCommandHandler
  implements ICommandHandler<VerifyEmailTaxPayerCommand>
{
  constructor(private readonly TaxPayerRepository: TaxPayerRepositoryPort) {}

  private readonly logger = new Logger(VerifyEmailTaxPayerCommandHandler.name);

  // decryptEmail(encryptedEmail: string, secretKey: string): string {
  // const iv = Buffer.from(encryptedEmail.slice(0, 32), 'hex');
  // const encryptedText = encryptedEmail.slice(32);
  // const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  // let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  // decrypted += decipher.final('utf8');
  // return decrypted;
  // }
  // }

  public async execute(payload: VerifyEmailTaxPayerCommand) {
    this.logger.log(`> VerifyEmailTaxPayerCommand: ${JSON.stringify(payload)}`);
    // giai ma token

    // ddungs thif status

    // sai thif baso eroor

    return payload;
  }
}
