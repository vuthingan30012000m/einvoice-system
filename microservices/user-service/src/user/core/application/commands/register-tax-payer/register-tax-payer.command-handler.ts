import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterTaxPayerCommand } from './register-tax-payer.command';
import { RegisterTaxPayerPort } from './register-tax-payer.port';

@CommandHandler(RegisterTaxPayerCommand)
export class RegisterTaxPayerCommandHandler
  implements ICommandHandler<RegisterTaxPayerCommand>
{
  constructor(private readonly registerTaxPayerPort: RegisterTaxPayerPort) {}

  private readonly logger = new Logger(RegisterTaxPayerCommandHandler.name);

  public async execute( payload : RegisterTaxPayerCommand): Promise<void> {
    this.logger.log(`> RegisterTaxPayerCommand: called`);
    console.log("🚀 ~ execute ~ payload:", payload)





    // await this.registerTaxPayerPort.registerTaxPayer(payload);
  }
}
