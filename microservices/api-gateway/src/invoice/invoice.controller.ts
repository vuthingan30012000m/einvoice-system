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
import { ApiTags } from '@nestjs/swagger';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoice')
@ApiTags('Dịch vụ quản lý hóa đơn')
export class InvoiceController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  // @Post()
  // create(@Body() createInvoiceDto: CreateInvoiceDto) {
  // console.log(
  // '🚀 ~ InvoiceController ~ create ~ createInvoiceDto:',
  // createInvoiceDto,
  // );
  // return this.natsClient.send({ cmd: 'createInvoiceDto' }, createInvoiceDto);
  // }
  // @Get()
  // findAll() {
  // return this.invoiceService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  // return this.invoiceService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  // return this.invoiceService.update(+id, updateInvoiceDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  // return this.invoiceService.remove(+id);
  // }
}
