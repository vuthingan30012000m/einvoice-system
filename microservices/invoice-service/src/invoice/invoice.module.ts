import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceApplications } from './core/application/invoice.application';
import { InvoiceInfrastructure } from './infrastructure/invoice.infrastructure';
import { InvoiceInterface } from './interface/invoice.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([...InvoiceInfrastructure.repositories]),
    CqrsModule,
  ],
  providers: [
    ...InvoiceInterface.resolvers,
    ...InvoiceInfrastructure.providers,
    ...InvoiceApplications,
  ],
  controllers: [...InvoiceInterface.controllers],
  exports: [],
})
export class InvoiceModule {}
