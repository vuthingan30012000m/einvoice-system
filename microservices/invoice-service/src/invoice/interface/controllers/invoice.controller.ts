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

@Controller('invoice')
export class InvoiceController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
}
