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
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { UpdateInvoiceDto } from './dtos/update-invoice.dto';

@ApiTags('Dịch vụ quản lý hóa đơn')
@Controller('invoice')
export class InvoiceController {
  constructor(@Inject('API_GATEWAY') private apiGateway: ClientProxy) {}

  // @ApiBearerAuth()
  @Get('find-tax-payer/:taxCode')
  @ApiOperation({ summary: 'Tra cứu người nộp thuế theo mã số thuế' })
  findTaxPayer(
    @Param('taxCode') taxCode: string,
    //   @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {
    //   if (!TaxPayer) {
    //     throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    //   }

    return this.apiGateway.send({ cmd: 'find-tax-payer' }, { taxCode });
  }

  // @Post('product')
  // @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  // async create(@Body() createProductDto: CreateProductDto)  {
  //   return await this.productService.create(createProductDto);
  // }

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
// <!-- Crud hóa đơn -->
// Lập hóa đơn mới
// Lập hóa đơn thay thế
// Xóa hóa đơn
// Tìm
// Đầu ra đầu vào
