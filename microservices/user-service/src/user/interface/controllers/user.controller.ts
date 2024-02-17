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
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { RegisterTaxPayerDto } from '../dto/register/register-tax-payer.dto';
import { RegisterTaxPayerCommand } from 'src/user/core/application/commands/register-tax-payer/register-tax-payer.command';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'register' })
  async create(@Payload() registerTaxPayerDto: RegisterTaxPayerDto) {
    console.log(
      '🚀 ~ UserController ~ create ~ registerTaxPayerDto:',
      registerTaxPayerDto,
    );
    await this.commandBus.execute(
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
    return 'registerTaxPayerDto';
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
