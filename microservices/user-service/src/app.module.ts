import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NATS_SERVICE: Joi.string().required(),

          DATABASE_HOST: Joi.string().required(),
          DATABASE_PORT: Joi.string().required(),
          DATABASE_USERNAME: Joi.string().required(),
          DATABASE_PASSWORD: Joi.string().required(),
          DATABASE_NAME: Joi.string().required(),
      }),
    }),
    UserModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
