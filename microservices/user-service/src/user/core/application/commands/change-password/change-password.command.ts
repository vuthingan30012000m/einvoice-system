import { ICommand } from '@nestjs/cqrs';

export class ChangePasswordCommand implements ICommand {
  constructor(
    public readonly password: string,
    public readonly passwordConfirm: string,
    public readonly usbToken: string,
  ) {}
}
