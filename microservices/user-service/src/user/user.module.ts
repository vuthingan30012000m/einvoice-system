import { Module } from '@nestjs/common';
import { UserService } from './interface/user.service';
import { UserController } from './interface/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxOffice } from './infrastructure/dataaccess/entities/tax-office.entity';
import { TaxOfficeSeeder } from './infrastructure/dataaccess/seeders/tax-office.seeder';
import { Bank } from './infrastructure/dataaccess/entities/bank.entity';
import { BankSeeder } from './infrastructure/dataaccess/seeders/bank.seeder';
import { Address } from './infrastructure/dataaccess/entities/address.entity';
import { AddressSeeder } from './infrastructure/dataaccess/seeders/address.seeder';
import { DatabaseConfig } from './infrastructure/dataaccess/config/database.config';
import { City } from './infrastructure/dataaccess/entities/city.entity';
import { District } from './infrastructure/dataaccess/entities/district.entity';
import { Ward } from './infrastructure/dataaccess/entities/ward.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

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
    TypeOrmModule.forFeature([TaxOffice, Bank, City, District, Ward, Address]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['DATABASE_HOST'],
      port: Number(process.env['DATABASE_PORT']),
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_NAME'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    // TaxOfficeSeeder,
    // BankSeeder,
    // AddressSeeder,
  ],
})
export class UserModule {}







// import { Module } from "@nestjs/common";
// import { CqrsModule } from "@nestjs/cqrs";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { UserApplications } from "../../../../../einvoice-system/microservices/user-service/src/user/core/application/user.application";
// import { UserInfrastructure } from "./infrastructure/user.infrastructure";
// import { UserInterface } from "./interface/user.interface";

// @Module({
//   imports: [TypeOrmModule.forFeature([...UserInfrastructure.repositories]), CqrsModule],
//   providers: [...UserInterface.resolvers, ...UserInfrastructure.providers, ...UserApplications],
//   controllers: [...UserInterface.controllers],
//   exports: [],
// })
// export class UserModule {}

