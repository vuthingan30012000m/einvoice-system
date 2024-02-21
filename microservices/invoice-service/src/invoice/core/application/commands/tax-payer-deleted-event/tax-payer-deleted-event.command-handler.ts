import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaxPayerDeletedEventCommand } from './tax-payer-deleted-event.command';
import { TaxPayerDeletedEventPort } from './tax-payer-deleted-event.port';

@CommandHandler(TaxPayerDeletedEventCommand)
export class TaxPayerDeletedEventCommandHandler
  implements ICommandHandler<TaxPayerDeletedEventCommand>
{
  constructor(
    private readonly taxPayerDeletedEventPort: TaxPayerDeletedEventPort,
  ) {}

  private readonly logger = new Logger(TaxPayerDeletedEventCommandHandler.name);

  public async execute({
    payload,
  }: TaxPayerDeletedEventCommand): Promise<void> {
    this.logger.log(`> TaxPayerDeletedEventCommand: called`);
  }
}
