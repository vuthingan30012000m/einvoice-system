import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './create-invoice.dto';
import { UpdateInvoiceDto } from './update-invoice.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @MessagePattern({ cmd: 'createInvoiceDto' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    console.log(
      '🚀 ~ InvoiceController ~ create ~ createInvoiceDto:',
      createInvoiceDto,
    );
    return createInvoiceDto;
    // return this.invoiceService.create(createInvoiceDto);
  }

  @EventPattern('product_created')
  async handleProductCreated(data: Record<string, unknown>) {
    console.log('🚀 ~ InvoiceController ~ handleProductCreated ~ data', data);
    // const product = await this.productService.create(data);
    // return product;

    // const product = Product.Builder(randomUUID())
    //   .withName(new ProductName(createProductCommand.name))
    //   .withCreatedAt(new Date())
    //   .build();

    // const newProduct = this.createProductPort.save(product);
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
