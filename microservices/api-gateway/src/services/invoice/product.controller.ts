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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateProductDto } from './dtos/create-product.dto';
import { ExcludeValueInterceptor } from '../../interceptors/exclude-value.interceptor';

@ApiTags('Dịch vụ quản lý hóa đơn')
@Controller('invoice')
@UseInterceptors(ExcludeValueInterceptor)
export class ProductController {
  constructor(@Inject('API_GATEWAY') private apiGateway: ClientProxy) {}

  // @ApiBearerAuth()
  @Post('create-product')
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    //   @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {
    //   if (!TaxPayer) {
    //     throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    //   }

    return this.apiGateway.send({ cmd: 'create-product' }, createProductDto);
  }

  // @Get('product')
  // @ApiOperation({ summary: 'Lấy tất cả sản phẩm' })
  // async findAll()  {
  //   return await this.productService.findAll();
  // }

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
