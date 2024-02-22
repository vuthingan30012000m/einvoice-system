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

import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { FindTaxPayerDto } from '../dtos/find-tax-payer.dto';
import { FindTaxPayerQuery } from '../../../core/application/queries/find-tax-payer/find-tax-payer.query';

import { CreateNewInvoiceDto } from '../dtos/create-new-invoice.dto';
import {
  CreateNewInvoiceCommand,
  CreateNewInvoiceItemCommand,
} from '../../../core/application/commands/create-new-invoice/create-new-invoice.command';

@Controller()
export class InvoiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'find-tax-payer' })
  async findTaxPayer(@Payload() FindTaxPayerDto: FindTaxPayerDto) {
    return await this.queryBus.execute(
      new FindTaxPayerQuery(FindTaxPayerDto.taxCode),
    );
  }

  @MessagePattern({ cmd: 'create-new-invoice' })
  async createNewInvoice(@Payload() createNewInvoiceDto: CreateNewInvoiceDto) {
    return await this.commandBus.execute(
      new CreateNewInvoiceCommand(
        createNewInvoiceDto.sellerId,
        createNewInvoiceDto.buyerId,

        createNewInvoiceDto.invoiceItems.map((item) => {
          return new CreateNewInvoiceItemCommand(
            item.productId,
            item.quantity,
            item.price,
            item.taxRate,
          );
        }),

        createNewInvoiceDto.usbToken,
      ),
    );

    //   createNewInvoiceDto.invoiceItems.map(item => {
    //     return new CreateNewInvoiceItemCommand(
    //       item.productId,
    //       item.quantity,
    //       item.price,
    //       item.taxRate,
    //     );
    //   }

    //   ,
    //   createNewInvoiceDto.usbToken,
    // ),
    // ),
    // );
  }
}
