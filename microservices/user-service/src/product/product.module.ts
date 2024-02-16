import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductInterface } from './interface/product.interface';
import { ProductInfrastructure } from './infrastructure/product.infrastructure';
import { ProductApplications } from './core/application/product.application';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [

    NatsClientModule,


    TypeOrmModule.forFeature([...ProductInfrastructure.repositories]),
    CqrsModule,
    // ...ProductInfrastructure.config,
  ],
  controllers: [...ProductInterface.controllers],
  providers: [
    ...ProductInterface.resolvers,
    ...ProductInfrastructure.providers,
    ...ProductApplications,
  ],
  exports: [],
})
export class ProductModule {}
