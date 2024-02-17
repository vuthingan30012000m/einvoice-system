import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RegisterTaxPayerDto } from '../dto/register-tax-payer.dto';

@Controller('user')
export class UserController {
  @MessagePattern({ cmd: 'register' })
  create(@Payload() registerTaxPayerDto: RegisterTaxPayerDto) {
    console.log('🚀 ~ UserController ~ create ~ registerTaxPayerDto:', registerTaxPayerDto);
    return 'registerTaxPayerDto';
    // return this.userService.create(registerTaxPayerDto);
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
