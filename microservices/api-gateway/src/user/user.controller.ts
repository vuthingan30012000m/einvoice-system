import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ClientProxy } from '@nestjs/microservices';

import { RegisterTaxPayerDto } from './dto/register/register-tax-payer.dto';
import { LoginTaxPayerDto } from './dto/login/login-tax-payer.dto';
import {
  TaxPayer,
  TaxPayerJwtPayload,
} from 'src/common/api/decorators/tax-payer.decorator';

@Controller('user')
@ApiTags('user-service')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  register(@Body() registerTaxPayerDto: RegisterTaxPayerDto) {
    return this.natsClient.send({ cmd: 'register' }, registerTaxPayerDto);
  }

  @Get('verify-email/:tokenEmail')
  @ApiOperation({ summary: 'Xác thực email' })
  verifyEmail(@Param('tokenEmail') tokenEmail: string) {
    return this.natsClient.send({ cmd: 'verify-email' }, tokenEmail);
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  login(@Body() LoginTaxPayerDto: LoginTaxPayerDto) {
    return this.natsClient.send({ cmd: 'login' }, LoginTaxPayerDto);
  }

  @Get('register-usb-token')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng ký  chữ ký số USB Token' })
  registerUsbToken(@TaxPayer() TaxPayer: TaxPayerJwtPayload) {
    if (!TaxPayer) {
      return 'Hãy đăng nhập để thực hiện chức năng này.';
    }


    return this.natsClient.send(
      { cmd: 'register-usb-token' },
      { taxCode: TaxPayer.taxCode },
    );
  }

  // @Get()
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // @Delete(':id')
}
