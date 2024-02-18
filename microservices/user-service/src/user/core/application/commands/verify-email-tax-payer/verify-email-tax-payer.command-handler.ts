import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailTaxPayerCommand } from './verify-email-tax-payer.command';

@CommandHandler(VerifyEmailTaxPayerCommand)
export class VerifyEmailTaxPayerCommandHandler
  implements ICommandHandler<VerifyEmailTaxPayerCommand>
{
  // constructor(private readonly verifyEmailTaxPayerPort: VerifyEmailTaxPayerPort) {}

  private readonly logger = new Logger(VerifyEmailTaxPayerCommandHandler.name);

  public async execute(payload: VerifyEmailTaxPayerCommand): Promise<void> {
    console.log(
      '🚀 ~ VerifyEmailTaxPayerCommandHandler ~ execute ~ payload:',
      payload,
    );
    this.logger.log(`> VerifyEmailTaxPayerCommand: called`);
    this.logger.log(`> RegisterTaxPayerCommand: ${JSON.stringify(payload)}`);
  }
}
