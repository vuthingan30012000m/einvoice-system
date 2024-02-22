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

import { ExcludeValueInterceptor } from '../../interceptors/exclude-value.interceptor';
import {
  TaxPayer,
  TaxPayerJwtPayload,
} from './../../decorators/tax-payer.decorator';

import { CreateNewInvoiceDto } from './dtos/create-new-invoice.dto';

@ApiTags('Dịch vụ quản lý hóa đơn')
@Controller('invoice')
@UseInterceptors(ExcludeValueInterceptor)
export class InvoiceController {
  constructor(@Inject('API_GATEWAY') private apiGateway: ClientProxy) {}

  @ApiBearerAuth()
  @Get('find-tax-payer/:taxCode')
  @ApiOperation({ summary: 'Tra cứu người nộp thuế theo mã số thuế' })
  findTaxPayer(
    @Param('taxCode') taxCode: string,
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {
    if (!TaxPayer) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.apiGateway.send({ cmd: 'find-tax-payer' }, { taxCode });
  }

  @ApiBearerAuth()
  @Post('create-new-invoice')
  @ApiOperation({ summary: 'Lập hóa đơn mới' })
  async createNewInvoice(
    @Body() createNewInvoiceDto: CreateNewInvoiceDto,
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {



    if (!TaxPayer) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
 

    return this.apiGateway.send(
      { cmd: 'create-new-invoice' },
      {
        sellerId: TaxPayer.taxCode,
            buyerId:createNewInvoiceDto.buyerId,
            invoiceItems: createNewInvoiceDto.invoiceItems,
        usbToken: createNewInvoiceDto.usbToken, 
 
      },
    );  
  }

  // @Get('find-tax-payer/:taxCode')
  // @ApiOperation({ summary: 'Tra cứu người nộp thuế theo mã số thuế' })
  // findTaxPayer(
  //   @Param('taxCode') taxCode: string,
  //   @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  // ) {
  //   if (!TaxPayer) {
  //     throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  //   }

  //   return this.apiGateway.send({ cmd: 'find-tax-payer' }, { taxCode });
  // }

  // Create replacement invoice
  // Lập hóa đơn thay thế

  // Delete invoice
  // Xóa hóa đơn

  // Find invoices by  id
  // Tra cứu hóa đơn theo số hóa đơn

  // Find all export
  // Tra cứu tất cả hóa đơn bán ra

  // Find all import
  // Tra cứu tất cả hóa đơn mua vào
}

//   @ApiBearerAuth()
//   @Post('find-all-product')
//   @ApiOperation({ summary: 'Lấy tất cả sản phẩm' })
//   async findAllProduct(
//     @Body() findAllProductDto: FindAllProductDto,
//     @TaxPayer() TaxPayer: TaxPayerJwtPayload,
//   ) {
//     if (!TaxPayer) {
//       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//     }

//     return this.apiGateway.send(
//       { cmd: 'find-all-product' },
//       {
//         taxPayerId: TaxPayer.taxCode,
//         usbToken: findAllProductDto.usbToken,
//       },
//     );
//   }

//   @ApiBearerAuth()
//   @Post('find-one-product')
//   @ApiOperation({ summary: 'Lấy sản phẩm theo id' })
//   async findOneProduct(
//     @Body() findOneProductDto: FindOneProductDto,
//     @TaxPayer() TaxPayer: TaxPayerJwtPayload,
//   ) {
//     if (!TaxPayer) {
//       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//     }

//     return this.apiGateway.send(
//       { cmd: 'find-one-product' },
//       {
//         productId: findOneProductDto.productId,
//         taxPayerId: TaxPayer.taxCode,
//         usbToken: findOneProductDto.usbToken,
//       },
//     );
//   }

//   @ApiBearerAuth()
//   @Patch('update-product')
//   @ApiOperation({ summary: 'Cập nhật sản phẩm' })
//   async updateProduct(
//     @Body() updateProductDto: UpdateProductDto,
//     @TaxPayer() TaxPayer: TaxPayerJwtPayload,
//   ) {
//     if (!TaxPayer) {
//       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//     }

//     return this.apiGateway.send(
//       { cmd: 'update-product' },
//       {
//         productId: updateProductDto.productId,
//         name: updateProductDto.name,
//         unit: updateProductDto.unit,
//         price: updateProductDto.price,
//         description: updateProductDto.description,
//         taxPayerId: TaxPayer.taxCode,
//         usbToken: updateProductDto.usbToken,
//       },
//     );
//   }

//   @ApiBearerAuth()
//   @Delete('delete-product')
//   @ApiOperation({ summary: 'Xóa sản phẩm' })
//   async deleteProduct(
//     @Body() DeleteProductDto: DeleteProductDto,
//     @TaxPayer() TaxPayer: TaxPayerJwtPayload,
//   ) {
//     if (!TaxPayer) {
//       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//     }

//     return this.apiGateway.send(
//       { cmd: 'delete-product' },
//       {
//         productId: DeleteProductDto.productId,
//         taxPayerId: TaxPayer.taxCode,
//         usbToken: DeleteProductDto.usbToken,
//       },
//     );
//   }
// }
