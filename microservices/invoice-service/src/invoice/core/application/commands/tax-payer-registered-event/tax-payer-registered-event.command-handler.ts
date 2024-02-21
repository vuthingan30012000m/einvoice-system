import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TaxPayerRegisteredEventCommand } from "./tax-payer-registered-event.command";
import { TaxPayerRegisteredEventPort } from "./tax-payer-registered-event.port";

@CommandHandler(TaxPayerRegisteredEventCommand)
export class TaxPayerRegisteredEventCommandHandler implements ICommandHandler<TaxPayerRegisteredEventCommand> {
  constructor(private readonly taxPayerRegisteredEventPort: TaxPayerRegisteredEventPort) {}

  private readonly logger = new Logger(TaxPayerRegisteredEventCommandHandler.name);

  public async execute({ payload }: TaxPayerRegisteredEventCommand): Promise<void> {
    this.logger.log(`> TaxPayerRegisteredEventCommand: called`);
  }
}
