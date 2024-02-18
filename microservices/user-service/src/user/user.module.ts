import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { UserApplications } from './core/application/user.application';
import { UserInterface } from './interface/user.interface';
import { UserInfrastructure } from './infrastructure/user.infrastructure';

@Module({
  imports: [
    CqrsModule,


    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema:  UserInfrastructure.validations,
    }),


    ...UserInfrastructure.configs,

    TypeOrmModule.forFeature([...UserInfrastructure.repositories]),
  ],
  controllers: [...UserInterface.controllers],
  providers: [
    ...UserInfrastructure.seeders,
    ...UserInterface.resolvers,
    ...UserInfrastructure.providers,
    ...UserApplications,
  ],
})
export class UserModule {}
