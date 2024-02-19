import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaxPayerCommand } from './delete-tax-payer.command';

@CommandHandler(DeleteTaxPayerCommand)
export class DeleteTaxPayerCommandHandler
  implements ICommandHandler<DeleteTaxPayerCommand>
{
  // constructor(private readonly deleteTaxPayerPort: DeleteTaxPayerPort) {}

  private readonly logger = new Logger(DeleteTaxPayerCommandHandler.name);

  public async execute( payload : DeleteTaxPayerCommand): Promise<void> {
    this.logger.log(`> DeleteTaxPayerCommand: called`);
  }
}
