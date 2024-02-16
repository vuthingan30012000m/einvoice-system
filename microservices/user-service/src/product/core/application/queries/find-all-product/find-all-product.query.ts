import { IQuery, IQueryResult } from '@nestjs/cqrs';

export class FindAllProductQuery implements IQuery {
  constructor() {}
}

export class FindAllProductQueryResult implements IQueryResult {
  constructor() {}
}
