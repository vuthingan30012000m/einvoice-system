import { TaxPayer } from './../../decorators/tax-payer.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateProductDto } from './dtos/create-product.dto';
import { ExcludeValueInterceptor } from '../../interceptors/exclude-value.interceptor';
import { TaxPayerJwtPayload } from '../../../dist/decorators/tax-payer.decorator';

@ApiTags('Dịch vụ quản lý hóa đơn')
@Controller('invoice')
@UseInterceptors(ExcludeValueInterceptor)
export class ProductController {
  constructor(@Inject('API_GATEWAY') private apiGateway: ClientProxy) {}

  @ApiBearerAuth()
  @Post('create-product')
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {
    if (!TaxPayer) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.apiGateway.send(
      { cmd: 'create-product' },
      {
        name: createProductDto.name,
        unit: createProductDto.unit,
        price: createProductDto.price,
        description: createProductDto.description,
        taxPayerId: TaxPayer.taxCode,
      },
    );
  }

  @Get('find-all-product')
  @ApiOperation({ summary: 'Lấy tất cả sản phẩm' })
  async findAllProduct(
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,

  )  {
    if (!TaxPayer) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }


    return this
  }

  // @Get('product/:id')
  // @ApiOperation({ summary: 'Lấy sản phẩm theo id' })
  // async findOne(@Param('id') id: string) {
  //   return await this.productService.findOne(id);
  // }

  // @Put('product/:id')
  // @ApiOperation({ summary: 'Cập nhật sản phẩm theo id' })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateProductDto,
  // )  {
  //   return await this.productService.update(id, updateProductDto);
  // }

  // @Delete('product/:id')
  // @ApiOperation({ summary: 'Xóa sản phẩm theo id' })
  // async remove(@Param('id') id: string)  {
  //   return await this.productService.remove(id);
  // }
}

// <!-- Crud sản phẩm -->
// Thêm ...
