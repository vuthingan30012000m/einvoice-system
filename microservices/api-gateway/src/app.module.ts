import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';
import { LoggingRequestMiddleware } from './common/api/middlewares/logging.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './common/api/filters/all-exception.filter';
import { TaxPayerInterceptor } from './common/api/interceptors/tax-payer.interceptor';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        NATS_SERVICE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVICE],
        },
      },
    ]),
    UserModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TaxPayerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingRequestMiddleware).forRoutes('*');
  }
}
