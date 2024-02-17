import { Module } from '@nestjs/common';
import { UserService } from './core/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './infrastructure/dataaccess/config/database.config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { UserInterface } from './interface/user.interface';
import { UserInfrastructure } from './infrastructure/user.infrastructure';
import { CqrsModule } from '@nestjs/cqrs';

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
    TypeOrmModule.forFeature([...UserInfrastructure.repositories]),
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
  controllers: [...UserInterface.controllers],
  providers: [
    // ...UserInfrastructure.seeders,
    UserService,
    // ...UserInterface.resolvers, ...UserInfrastructure.providers, ...UserApplications],
  ],
})
export class UserModule {}
