import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUsbTokenCommand } from './register-usb-token.command';

@CommandHandler(RegisterUsbTokenCommand)
export class RegisterUsbTokenCommandHandler
  implements ICommandHandler<RegisterUsbTokenCommand>
{
  // constructor(private readonly registerUsbTokenPort: RegisterUsbTokenPort) {}

  private readonly logger = new Logger(RegisterUsbTokenCommandHandler.name);

  public async execute(payload: RegisterUsbTokenCommand): Promise<void> {
    this.logger.log(`> RegisterUsbTokenCommand: ${JSON.stringify(payload)}`);
  }
}
