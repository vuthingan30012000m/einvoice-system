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

@Controller('user')
@ApiTags('user-service')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  register(@Body() registerTaxPayerDto: RegisterTaxPayerDto) {
    return this.natsClient.send({ cmd: 'register' }, registerTaxPayerDto);
  }


  // signatures

  // @Post('login')
  // @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  // login(@Body() registerTaxPayerDto: RegisterTaxPayerDto) {
  //   return this.natsClient.send({ cmd: 'login' }, registerTaxPayerDto);
  // }


  // @Post('login')
  // @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  // login(@Body() registerTaxPayerDto: RegisterTaxPayerDto) {
  //   return this.natsClient.send({ cmd: 'login' }, registerTaxPayerDto);
  // }





  // @Get()
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // @Delete(':id')
}
