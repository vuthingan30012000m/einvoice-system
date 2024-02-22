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

import { FindTaxPayerQuery } from '../../../core/application/queries/find-tax-payer/find-tax-payer.query';
import { FindTaxPayerDto } from '../dtos/find-tax-payer.dto';

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
    console.log(
      '🚀 ~ InvoiceController ~ createNewInvoice ~ createNewInvoiceDto:',
      createNewInvoiceDto,
    );
    // return await this.commandBus.execute(
    // new createNewInvoice  (createNewInvoiceDto.taxCode),
    // );
  }
}
