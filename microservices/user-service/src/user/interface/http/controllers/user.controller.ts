import { Controller, UseInterceptors } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';

import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { RegisterTaxPayerDto } from '../dtos/register-tax-payer.dto';
import { RegisterTaxPayerCommand } from 'src/user/core/application/commands/register-tax-payer/register-tax-payer.command';
import { LoginTaxPayerDto } from '../dtos/login-tax-payer.dto';
import { LoginTaxPayerQuery } from 'src/user/core/application/queries/login-tax-payer/login-tax-payer.query';
import { VerifyEmailTaxPayerCommand } from 'src/user/core/application/commands/verify-email-tax-payer/verify-email-tax-payer.command';
import { RegisterUsbTokenDto } from '../dtos/register-usb-token.dto';
import { RegisterUsbTokenCommand } from 'src/user/core/application/commands/register-usb-token/register-usb-token.command';
import { GetTaxPayerCurrentDto } from '../dtos/get-tax-payer-current.dto';
import { GetTaxPayerCurrentQuery } from 'src/user/core/application/queries/get-tax-payer-current/get-tax-payer-current.query';
import { RequestResetPasswordDto } from '../dtos/request-reset-password.dto';
import { RequestResetPasswordQuery } from 'src/user/core/application/queries/request-reset-password/request-reset-password.query';
import { VerifyResetPasswordCommand } from 'src/user/core/application/commands/verify-reset-password/verify-reset-password.command';
import { ChangePasswordCommand } from 'src/user/core/application/commands/change-password/change-password.command';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { UpdateTaxPayerCommand } from 'src/user/core/application/commands/update-tax-payer/update-tax-payer.command';
import { UpdateTaxPayerDto } from '../dtos/update-tax-payer.dto';
import { DeleteTaxPayerDto } from '../dtos/delete-tax-payer.dto';
import { DeleteTaxPayerCommand } from 'src/user/core/application/commands/delete-tax-payer/delete-tax-payer.command';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'register' })
  async register(@Payload() registerTaxPayerDto: RegisterTaxPayerDto) {
    return await this.commandBus.execute(
      new RegisterTaxPayerCommand(
        registerTaxPayerDto.name,
        registerTaxPayerDto.password,
        registerTaxPayerDto.email,
        registerTaxPayerDto.phoneNumber,
        registerTaxPayerDto.taxOfficeId,
        registerTaxPayerDto.bankId,
        registerTaxPayerDto.accountBank,
        registerTaxPayerDto.wardId,
        registerTaxPayerDto.noteAddress,
      ),
    );
  }

  @MessagePattern({ cmd: 'verify-email' })
  async verifyEmail(@Payload() tokenEmail: string) {
    return await this.commandBus.execute(
      new VerifyEmailTaxPayerCommand(tokenEmail),
    );
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() LoginTaxPayerDto: LoginTaxPayerDto) {
    return await this.queryBus.execute(
      new LoginTaxPayerQuery(
        LoginTaxPayerDto.taxCode,
        LoginTaxPayerDto.password,
        LoginTaxPayerDto.usbToken,
      ),
    );
  }

  @MessagePattern({ cmd: 'get-tax-payer-current' })
  async getTaxPayerCurrent(
    @Payload() getTaxPayerCurrentDto: GetTaxPayerCurrentDto,
  ) {
    return await this.queryBus.execute(
      new GetTaxPayerCurrentQuery(getTaxPayerCurrentDto.taxCode),
    );
  }

  @MessagePattern({ cmd: 'request-reset-password' })
  async requestResetPassword(
    @Payload() requestResetPasswordDto: RequestResetPasswordDto,
  ) {
    return this.queryBus.execute(
      new RequestResetPasswordQuery(requestResetPasswordDto.email),
    );
  }

  @MessagePattern({ cmd: 'verify-reset-password' })
  async verifyResetPassword(@Payload() tokenPassword: string) {
    return await this.commandBus.execute(
      new VerifyResetPasswordCommand(tokenPassword),
    );
  }

  @MessagePattern({ cmd: 'register-usb-token' })
  async registerUsbToken(@Payload() RegisterUsbTokenDto: RegisterUsbTokenDto) {
    return await this.commandBus.execute(
      new RegisterUsbTokenCommand(RegisterUsbTokenDto.taxCode),
    );
  }

  @MessagePattern({ cmd: 'change-password' })
  async changePassword(@Payload() changePasswordDto: ChangePasswordDto) {
    return await this.commandBus.execute(
      new ChangePasswordCommand(
        changePasswordDto.taxCode,
        changePasswordDto.password,
        changePasswordDto.passwordConfirm,
        changePasswordDto.usbToken,
      ),
    );
  }
  @MessagePattern({ cmd: 'update-tax-payer' })
  async updateTaxPayer(@Payload() updateTaxPayerDto: UpdateTaxPayerDto) {
    return await this.commandBus.execute(
      new UpdateTaxPayerCommand(
        updateTaxPayerDto.taxCode,
        updateTaxPayerDto.name,
        updateTaxPayerDto.email,
        updateTaxPayerDto.phoneNumber,
        updateTaxPayerDto.usbToken,
      ),
    );
  }
  @MessagePattern({ cmd: 'delete-tax-payer' })
  async deleteTaxPayer(@Payload() deleteTaxPayerDto: DeleteTaxPayerDto) {
    return await this.commandBus.execute(
      new DeleteTaxPayerCommand(
        deleteTaxPayerDto.taxCode,
        deleteTaxPayerDto.usbToken,
      ),
    );
  }
}
