import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  // constructor(private readonly changePasswordPort: ChangePasswordPort) {}

  private readonly logger = new Logger(ChangePasswordCommandHandler.name);

  public async execute(payload: ChangePasswordCommand): Promise<void> {
    this.logger.log(`> ChangePasswordCommand: called`);
  }
}
