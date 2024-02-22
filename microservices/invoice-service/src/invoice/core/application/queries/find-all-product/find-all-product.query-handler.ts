import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllProductPort } from './find-all-product.port';
import {
  FindAllProductQuery,
  FindAllProductQueryResult,
} from './find-all-product.query';

@QueryHandler(FindAllProductQuery)
export class FindAllProductQueryHandler
  implements IQueryHandler<FindAllProductQuery>
{
  constructor(private readonly findAllProductPort: FindAllProductPort) {}

  public async execute({ payload }: FindAllProductQuery): Promise<void> {}
}
