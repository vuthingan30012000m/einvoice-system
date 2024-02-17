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

import { RegisterTaxPayerDto } from '../dto/register-tax-payer.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


  @MessagePattern({ cmd: 'register' })
  create(@Payload() registerTaxPayerDto: RegisterTaxPayerDto) {
    console.log('🚀 ~ UserController ~ create ~ registerTaxPayerDto:', registerTaxPayerDto);

  //   const newProduct = await this.commandBus.execute(
  //     new CreateProductCommand(createProductDto.name),
  //   );
  //   return classToPlain(new ResponseCreateProductDto(newProduct));
  // }
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
