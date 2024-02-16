import { ProductEntity } from './dataaccess/entities/product.entity';
import { CreateProductPort } from '../core/application/commands/create-product/create-product.port';
import { OrmProductRepository } from './dataaccess/repositories/product.repository';
import { FindAllProductPort } from '../core/application/queries/find-all-product/find-all-product.port';
import { DatabaseConfig } from './dataaccess/config/database.config';

export const ProductInfrastructure = {
  // config: DatabaseConfig.init(),
  config: [DatabaseConfig.init()],
  repositories: [ProductEntity],
  providers: [
    {
      provide: CreateProductPort,
      useClass: OrmProductRepository,
    },
    {
      provide: FindAllProductPort,
      useClass: OrmProductRepository,
    },
  ],
};
