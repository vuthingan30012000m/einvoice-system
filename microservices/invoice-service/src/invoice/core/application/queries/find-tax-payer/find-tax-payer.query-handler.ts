import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// import { FindTaxPayerPort } from './find-tax-payer.port';

import {
  FindTaxPayerQuery,
} from './find-tax-payer.query';

@QueryHandler(FindTaxPayerQuery)
export class FindTaxPayerQueryHandler
  implements IQueryHandler<FindTaxPayerQuery>
{
  // constructor(private readonly findTaxPayerPort: FindTaxPayerPort) {}

  public async execute({ payload }: FindTaxPayerQuery): Promise<void> {}
}
