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

import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { UpdateInvoiceDto } from './dtos/update-invoice.dto';
import { ExcludeValueInterceptor } from '../../interceptors/exclude-value.interceptor';

@ApiTags('Dịch vụ quản lý hóa đơn')
@Controller('invoice')
@UseInterceptors(ExcludeValueInterceptor)
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
  
  // <!-- Crud hóa đơn -->
  // Lập hóa đơn mới
// Lập hóa đơn thay thế
// Xóa hóa đơn
// Tìm
// Đầu ra đầu vào

}