import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NATS_SERVICE: Joi.string().required(),
      }),
    }),
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
