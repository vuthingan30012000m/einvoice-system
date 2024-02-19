import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { RegisterTaxPayerDto } from '../dto/register/register-tax-payer.dto';
import { RegisterTaxPayerCommand } from 'src/user/core/application/commands/register-tax-payer/register-tax-payer.command';
import { RemovePasswordInterceptor } from 'src/common/api/interceptors/remove-password.interceptor';
import { ExcludeValueInterceptor } from 'src/common/api/interceptors/exclude-value.interceptor';
import { LoginTaxPayerDto } from '../dto/login/login-tax-payer.dto';
import { LoginTaxPayerQuery } from 'src/user/core/application/queries/login-tax-payer/login-tax-payer.query';
import { VerifyEmailTaxPayerCommand } from 'src/user/core/application/commands/verify-email-tax-payer/verify-email-tax-payer.command';
import { RegisterUsbTokenDto } from '../dto/register-usb-token/register-usb-token.dto';
import { RegisterUsbTokenCommandHandler } from 'src/user/core/application/commands/register-usb-token/register-usb-token.command-handler';
import { RegisterUsbTokenCommand } from 'src/user/core/application/commands/register-usb-token/register-usb-token.command';
import { GetTaxPayerCurrentDto } from '../dto/get-tax-payer-current/get-tax-payer-current.dto';

@Controller('user')
@UseInterceptors(ExcludeValueInterceptor)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'register' })
  // @UseInterceptors(RemovePasswordInterceptor)
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
  @MessagePattern({ cmd: 'get-taxpayer-current' })
  async getTaxPayerCurrent(
    @Payload() getTaxPayerCurrentDto: GetTaxPayerCurrentDto,
  ) {
    console.log(
      '🚀 ~ UserController ~ getTaxPayerCurrent ~ getTaxPayerCurrentDto:',
      getTaxPayerCurrentDto,
    );
    return getTaxPayerCurrentDto;
    // return await this.queryBus.execute(new LoginTaxPayerQuery(taxCode));
  }

  @MessagePattern({ cmd: 'register-usb-token' })
  async registerUsbToken(@Payload() RegisterUsbTokenDto: RegisterUsbTokenDto) {
    return await this.commandBus.execute(
      new RegisterUsbTokenCommand(RegisterUsbTokenDto.taxCode),
    );
  }

  // @Get()
  // findAll() {
  // return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  // return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  // return this.userService.remove(+id);
  // }
}
