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

import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { CreateProductDto } from '../dtos/create-product.dto';
import { CreateProductCommand } from '../../../core/application/commands/create-product/create-product.command';

import { FindAllProductDto } from '../dtos/find-all-product.dto';
import { FindAllProductQuery } from '../../../core/application/queries/find-all-product/find-all-product.query';

@Controller()
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'create-product' })
  async createProduct(@Payload() CreateProductDto: CreateProductDto) {
    return await this.commandBus.execute(
      new CreateProductCommand(
        CreateProductDto.name,
        CreateProductDto.unit,
        CreateProductDto.price,
        CreateProductDto.description,
        CreateProductDto.taxPayerId,
        CreateProductDto.usbToken,
      ),
    );
  }

  @MessagePattern({ cmd: 'find-all-product' })
  async findAllProduct(@Payload() findAllProductDto: FindAllProductDto) {
    return await this.queryBus.execute(
      new FindAllProductQuery(
        findAllProductDto.taxPayerId,
        findAllProductDto.usbToken,
      ),
    );
  }
}
