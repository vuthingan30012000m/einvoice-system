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
import { TaxPayer } from 'src/common/api/decorators/tax-payer.decorator';

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

  // @Get('testTaxPayer')
  // @ApiBearerAuth()
  // testTaxPayer(@TaxPayer() TaxPayer) {
  //   console.log('🚀 ~ register ~ TaxPayer:', TaxPayer);

  //   // api_gateway-1  | 🚀 ~ register ~ TaxPayer: {
  //   //   api_gateway-1  |   taxCode: 'bf7bf2dc-2eb8-47a0-bc27-14659eb6461b',
  //   //   api_gateway-1  |   statusTaxPayer: 'VERIFY_EMAIL',
  //   //   api_gateway-1  |   iat: 1708270739,
  //   //   api_gateway-1  |   exp: 1708271039
  //   //   api_gateway-1  | }
  // }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  login(@Body() LoginTaxPayerDto: LoginTaxPayerDto) {
    return this.natsClient.send({ cmd: 'login' }, LoginTaxPayerDto);
  }

  // @Post('register-usb-token')
  // @ApiOperation({ summary: 'Đăng ký  chữ ký số USB Token' })
  // registerUsbToken(@Param('tokenEmail') tokenEmail: string) {
  //   return this.natsClient.send({ cmd: 'verify-email' }, tokenEmail);
  // }

  // @Get()
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // @Delete(':id')
}
