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
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller('invoice')
export class InvoiceController {
  @MessagePattern({ cmd: 'find-tax-payer' })
  async findTaxPayer(@Payload() taxCode: string) {
    console.log('🚀 ~ InvoiceController ~ findTaxPayer ~ taxCode:', taxCode);
    // return await this.commandBus.execute(
    //   new VerifyEmailTaxPayerCommand(tokenEmail),
    // );
  } 
}
