import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateNewInvoiceCommand } from "./create-new-invoice.command";
import { CreateNewInvoicePort } from "./create-new-invoice.port";

@CommandHandler(CreateNewInvoiceCommand)
export class CreateNewInvoiceCommandHandler implements ICommandHandler<CreateNewInvoiceCommand> {
  constructor(private readonly createNewInvoicePort: CreateNewInvoicePort) {}

  private readonly logger = new Logger(CreateNewInvoiceCommandHandler.name);

  public async execute({ payload }: CreateNewInvoiceCommand): Promise<void> {
    this.logger.log(`> CreateNewInvoiceCommand: called`);
  }
}
