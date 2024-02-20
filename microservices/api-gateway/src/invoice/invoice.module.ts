import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { NatsClientModule } from '../common/api/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [InvoiceController],
  providers: [],
})
export class InvoiceModule {}
