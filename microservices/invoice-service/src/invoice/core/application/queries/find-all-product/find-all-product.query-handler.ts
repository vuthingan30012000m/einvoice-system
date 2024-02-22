import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllProductQuery } from './find-all-product.query';
import { ProductRepositoryPort } from '../../ports/dataaccess/repositories/product.repository.port';
import { Logger } from '@nestjs/common';

@QueryHandler(FindAllProductQuery)
export class FindAllProductQueryHandler
  implements IQueryHandler<FindAllProductQuery>
{
  private readonly logger = new Logger(FindAllProductQueryHandler.name);
  constructor(private readonly ProductRepository: ProductRepositoryPort) {}

  public async execute(payload: FindAllProductQuery) {
    try {
      this.logger.debug(`> payload: ${JSON.stringify(payload)}`);

      return await this.ProductRepository.getAll();
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
