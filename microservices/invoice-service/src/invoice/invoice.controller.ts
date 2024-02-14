import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @MessagePattern({ cmd: 'createInvoiceDto' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    console.log("🚀 ~ InvoiceController ~ create ~ createInvoiceDto:", createInvoiceDto)
    return createInvoiceDto;
    // return this.invoiceService.create(createInvoiceDto);
  }

  // @Get()
  // findAll() {
  //   return this.invoiceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.invoiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  //   return this.invoiceService.update(+id, updateInvoiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invoiceService.remove(+id);
  // }
}
