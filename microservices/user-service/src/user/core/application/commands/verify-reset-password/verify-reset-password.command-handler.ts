import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyResetPasswordCommand } from './verify-reset-password.command';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';
import { EncryptionEmailService } from 'src/user/core/domain/services/encryption-email.service';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';

@CommandHandler(VerifyResetPasswordCommand)
export class VerifyResetPasswordCommandHandler
  implements ICommandHandler<VerifyResetPasswordCommand>
{
  constructor(
    private readonly EncryptionEmailService: EncryptionEmailService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
  ) {}

  private readonly logger = new Logger(VerifyResetPasswordCommandHandler.name);

  public async execute(payload: VerifyResetPasswordCommand) {
    try {
      this.logger.log(
        `> VerifyResetPasswordCommand: ${JSON.stringify(payload)}`,
      );

      return 'newPassword';
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { error: error.message };
    }
  }
}
