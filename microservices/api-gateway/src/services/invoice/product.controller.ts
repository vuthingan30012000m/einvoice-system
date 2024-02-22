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
import {
  TaxPayer,
  TaxPayerJwtPayload,
} from './../../decorators/tax-payer.decorator';

import { CreateProductDto } from './dtos/create-product.dto';
import { ExcludeValueInterceptor } from '../../interceptors/exclude-value.interceptor';
import { FindAllProductDto } from './dtos/find-all-product.dto';
import { FindOneProductDto } from './dtos/find-one-product.dto'

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
        usbToken: createProductDto.usbToken,
      },
    );
  }

  @ApiBearerAuth()
  @Post('find-all-product')
  @ApiOperation({ summary: 'Lấy tất cả sản phẩm' })
  async findAllProduct(
    @Body() findAllProductDto: FindAllProductDto,
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {
    if (!TaxPayer) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.apiGateway.send(
      { cmd: 'find-all-product' },
      {
        taxPayerId: TaxPayer.taxCode,
        usbToken: findAllProductDto.usbToken,
      },
    );
  }




  @ApiBearerAuth()
  @Post('find-one-product')
  @ApiOperation({ summary: 'Lấy sản phẩm theo id' })
  async findOneProduct(
    @Body() findOneProductDto: FindOneProductDto,
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {
    if (!TaxPayer) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.apiGateway.send(
      { cmd: 'find-one-product' },
      {
        productId: findOneProductDto.productId,
        taxPayerId: TaxPayer.taxCode,
        usbToken: findOneProductDto.usbToken,
      },
    );
  }


  @ApiBearerAuth()
  @Patch('create-product')
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  // @ApiOperation({ summary: 'Cập nhật sản phẩm' })
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
        usbToken: createProductDto.usbToken,
      },
    );
  } 

  // @Delete('product/:id')
  // @ApiOperation({ summary: 'Xóa sản phẩm' })
  // async remove(@Param('id') id: string)  {
  //   return await this.productService.remove(id);
  // }
}
