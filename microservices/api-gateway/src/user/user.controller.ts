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

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ClientProxy } from '@nestjs/microservices';

import { RegisterTaxPayerDto } from './dto/register/register-tax-payer.dto';
import { LoginTaxPayerDto } from './dto/login/login-tax-payer.dto';

@Controller('user')
@ApiTags('user-service')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  register(@Body() registerTaxPayerDto: RegisterTaxPayerDto) {
    return this.natsClient.send({ cmd: 'register' }, registerTaxPayerDto);
  }


  
  @Post('verify-email')
  @ApiOperation({ summary: 'Xác thực email' })
  verifyEmail(@Body() registerTaxPayerDto: RegisterTaxPayerDto) {
    return this.natsClient.send({ cmd: 'verify-email' }, registerTaxPayerDto);
  }

  // signatures

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  login(@Body() LoginTaxPayerDto: LoginTaxPayerDto) {
    return this.natsClient.send({ cmd: 'login' }, LoginTaxPayerDto);
  }

  // @Get()
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // @Delete(':id')
}
