import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TaxPayerUpdatedEventCommand } from "./tax-payer-updated-event.command";
import { TaxPayerUpdatedEventPort } from "./tax-payer-updated-event.port";

@CommandHandler(TaxPayerUpdatedEventCommand)
export class TaxPayerUpdatedEventCommandHandler implements ICommandHandler<TaxPayerUpdatedEventCommand> {
  constructor(private readonly taxPayerUpdatedEventPort: TaxPayerUpdatedEventPort) {}

  private readonly logger = new Logger(TaxPayerUpdatedEventCommandHandler.name);

  public async execute({ payload }: TaxPayerUpdatedEventCommand): Promise<void> {
    this.logger.log(`> TaxPayerUpdatedEventCommand: called`);
  }
}
