import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { classToPlain } from 'class-transformer';
import { CreateProductDto } from '../dto/create-product/create-product.dto';
import { ResponseCreateProductDto } from '../dto/create-product/response-create-product.dto';
import { ResponseFindAllProductDto } from '../dto/find-all-product/response-find-all-product.dto';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from 'src/product/core/application/commands/create-product/create-product.command';
import { FindAllProductQuery } from 'src/product/core/application/queries/find-all-product/find-all-product.query';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  @ApiResponse({ status: 201, type: ResponseCreateProductDto })
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto) {
    const newProduct = await this.commandBus.execute(
      new CreateProductCommand(createProductDto.name),
    );
    return classToPlain(new ResponseCreateProductDto(newProduct));
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả sản phẩm' })
  @ApiResponse({ status: 200, type: [ResponseFindAllProductDto] })
  async findAll() {
    const existProduct = await this.queryBus.execute(new FindAllProductQuery());
    return existProduct.map((item) =>
      classToPlain(new ResponseFindAllProductDto(item)),
    );
  }

  //   @ApiParam({ name: 'id', required: true })
  //   async findOne(@Param('id') id: string): Promise<Product> {
  //     return await this.productService.findOne(id);
  //   }

  //   @ApiParam({ name: 'id', required: true })
  //   @ApiBody({ type: UpdateProductDto })
  //   async update(
  //     @Param('id') id: string,
  //     @Body() updateProductDto: UpdateProductDto,
  //   ): Promise<Product> {
  //     return await this.productService.update(id, updateProductDto);
  //   }
}
