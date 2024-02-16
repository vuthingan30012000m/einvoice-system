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
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('user')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('createUserDto')
  create(@Body() createUserDto: CreateUserDto) {
    console.log('🚀 ~ UserController ~ create ~ createUserDto:', createUserDto);
    return this.natsClient.send({ cmd: 'createUserDto' }, createUserDto);
  }
  @Post('createProductDto')
  createProduct(@Body() createProductDto: CreateProductDto) {
    console.log(
      '🚀 ~ UserController ~ create ~ createProductDto:',
      createProductDto,
    );
    return this.natsClient.send({ cmd: 'createProductDto' }, createProductDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
