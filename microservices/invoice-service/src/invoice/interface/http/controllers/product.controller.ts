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

import { FindOneProductDto } from '../dtos/find-one-product.dto';
import { FindOneProductQuery } from '../../../core/application/queries/find-one-product/find-one-product.query';

import { UpdateProductDto } from '../dtos/update-product.dto';
import { UpdateProductCommand } from '../../../core/application/commands/update-product/update-product.command';

import { DeleteProductDto } from '../dtos/delete-product.dto';

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

  @MessagePattern({ cmd: 'find-one-product' })
  async findOneProduct(@Payload() findOneProductDto: FindOneProductDto) {
    return await this.queryBus.execute(
      new FindOneProductQuery(
        findOneProductDto.productId,
        findOneProductDto.taxPayerId,
        findOneProductDto.usbToken,
      ),
    );
  }

  @MessagePattern({ cmd: 'update-product' })
  async updateProduct(@Payload() updateProductDto: UpdateProductDto) {
    return await this.commandBus.execute(
      new UpdateProductCommand(
        updateProductDto.productId,
        updateProductDto.name,
        updateProductDto.unit,
        updateProductDto.price,
        updateProductDto.description,
        updateProductDto.taxPayerId,
        updateProductDto.usbToken,
      ),
    );
  }

  @MessagePattern({ cmd: 'delete-product' })
  async deleteProduct(@Payload() deleteProductDto: DeleteProductDto) {
    return await this.queryBus.execute(
      new DeleteProductQuery(
        deleteProductDto.productId,
        deleteProductDto.taxPayerId,
        deleteProductDto.usbToken,
      ),
    );
  }
}
