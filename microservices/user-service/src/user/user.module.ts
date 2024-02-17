import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import { CqrsModule } from '@nestjs/cqrs';

import { UserApplications } from './core/application/user.application';
import { UserInterface } from './interface/user.interface';
import { UserInfrastructure } from './infrastructure/user.infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
    CqrsModule,
    ...UserInfrastructure.configs,
    TypeOrmModule.forFeature([...UserInfrastructure.repositories]),
  ],
  controllers: [...UserInterface.controllers],
  providers: [
    // ...UserInfrastructure.seeders,
    ...UserInterface.resolvers,
    ...UserInfrastructure.providers,
    ...UserApplications,
  ],
})
export class UserModule {}
