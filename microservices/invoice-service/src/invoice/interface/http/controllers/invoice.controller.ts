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

import { TaxPayerRegisteredEvent } from 'src/invoice/core/domain/events/tax-payer-registered.event';
import { TaxPayerRegisteredEventDto } from '../../listener/dtos/tax-payer-registered.event.dto';

@Controller()
export class InvoiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'find-tax-payer' })
  async findTaxPayer(@Payload() taxCode: string) {
    console.log('🚀 ~ InvoiceController ~ findTaxPayer ~ taxCode:', taxCode);
    // return await this.commandBus.execute(
    // new VerifyEmailTaxPayerCommand(tokenEmail),
    // );
  }
}
