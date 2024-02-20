import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserApplications } from './core/application/user.application';
import { UserInterface } from './interface/user.interface';
import { UserInfrastructure } from './infrastructure/user.infrastructure';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: UserInfrastructure.validations,
    }),
    ...UserInfrastructure.configs,
    TypeOrmModule.forFeature([...UserInfrastructure.repositories]),
    ...UserApplications.imports,
  ],

  controllers: [...UserInterface.controllers],

  providers: [
    ...UserInfrastructure.seeders,
    ...UserInterface.resolvers,
    ...UserInfrastructure.providers,
    ...UserApplications.providers,
  ],
  exports: [],
})
export class UserModule {}
