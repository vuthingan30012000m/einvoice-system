import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaxPayerCommand } from './update-tax-payer.command';

@CommandHandler(UpdateTaxPayerCommand)
export class UpdateTaxPayerCommandHandler
  implements ICommandHandler<UpdateTaxPayerCommand>
{
  // constructor(private readonly updateTaxPayerPort: UpdateTaxPayerPort) {}

  private readonly logger = new Logger(UpdateTaxPayerCommandHandler.name);

  public async execute({ payload }: UpdateTaxPayerCommand): Promise<void> {
    this.logger.log(`> UpdateTaxPayerCommand: called`);
  }
}
