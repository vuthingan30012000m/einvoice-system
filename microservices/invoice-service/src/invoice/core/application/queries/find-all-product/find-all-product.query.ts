import { IQuery, IQueryResult } from '@nestjs/cqrs';

export class FindAllProductQuery implements IQuery {
  constructor(public readonly taxPayerId: string) {}
}
