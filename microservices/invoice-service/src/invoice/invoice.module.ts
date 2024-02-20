import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';

import { InvoiceApplications } from './core/application/invoice.application';
import { InvoiceInfrastructure } from './infrastructure/invoice.infrastructure';
import { InvoiceInterface } from './interface/invoice.interface';

@Module({
  imports: [
    // JwtModule.register({
    // secret: process.env.JWT_SECRET,
    // signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: InvoiceInfrastructure.validations,
    }),
    ...InvoiceInfrastructure.configs,
    TypeOrmModule.forFeature([...InvoiceInfrastructure.repositories]),
    ...InvoiceApplications.imports,
  ],

  providers: [
    ...InvoiceInfrastructure.seeders,
    ...InvoiceInterface.resolvers,
    ...InvoiceInfrastructure.providers,
    ...InvoiceApplications.providers,
  ],
  controllers: [...InvoiceInterface.controllers],
  exports: [],
})
export class InvoiceModule {}
