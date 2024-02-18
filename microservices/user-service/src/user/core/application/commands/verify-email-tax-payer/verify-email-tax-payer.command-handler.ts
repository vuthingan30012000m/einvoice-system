import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailTaxPayerCommand } from './verify-email-tax-payer.command';
import { TaxPayerRepository } from '../../ports/dataaccess/repositories/tax-payer.repository';

@CommandHandler(VerifyEmailTaxPayerCommand)
export class VerifyEmailTaxPayerCommandHandler
  implements ICommandHandler<VerifyEmailTaxPayerCommand>
{
  constructor(private readonly TaxPayerRepository: TaxPayerRepository) {}

  private readonly logger = new Logger(VerifyEmailTaxPayerCommandHandler.name);

  public async execute(payload: VerifyEmailTaxPayerCommand): Promise<void> {
    this.logger.log(`> VerifyEmailTaxPayerCommand: ${JSON.stringify(payload)}`);

    // ddungs thif status

    // sai thif baso eroor
  }
}
