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

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoice')
@ApiTags('Dịch vụ quản lý hóa đơn')
export class InvoiceController {
  constructor(@Inject('API_GATEWAY') private apiGateway: ClientProxy) {}

  // <!-- Find taxpayers by tax code -->
  // <!-- Tra cứu người nộp thuế theo mã số thuế -->
  //
  // Giống tokenEmail



  @Get('find-tax-payer/:taxCode')
  @ApiOperation({ summary: 'Tra cứu người nộp thuế theo mã số thuế' })
  findTaxPayer(@Param('taxCode') taxCode: string) {
    return this.apiGateway.send({ cmd: 'find-tax-payer' }, taxCode);
  }

}
