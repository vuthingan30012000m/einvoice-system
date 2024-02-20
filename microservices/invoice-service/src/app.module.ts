import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        APP_PORT: Joi.string().required(),
        APP_DOMAIN: Joi.string().required(),
        NATS_SERVICE: Joi.string().required(),
        // VERIFY_EMAIL_SECRET: Joi.string().required(),
        // VERIFY_RESET_PASSWORD_SECRET: Joi.string().required(),

        // JWT_SECRET: Joi.string().required(),
        // JWT_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
