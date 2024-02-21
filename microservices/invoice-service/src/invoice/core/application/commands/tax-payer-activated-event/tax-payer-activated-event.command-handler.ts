import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TaxPayerActivatedEventCommand } from "./tax-payer-activated-event.command";
import { TaxPayerActivatedEventPort } from "./tax-payer-activated-event.port";

@CommandHandler(TaxPayerActivatedEventCommand)
export class TaxPayerActivatedEventCommandHandler implements ICommandHandler<TaxPayerActivatedEventCommand> {
  constructor(private readonly taxPayerActivatedEventPort: TaxPayerActivatedEventPort) {}

  private readonly logger = new Logger(TaxPayerActivatedEventCommandHandler.name);

  public async execute({ payload }: TaxPayerActivatedEventCommand): Promise<void> {
    this.logger.log(`> TaxPayerActivatedEventCommand: called`);
  }
}
