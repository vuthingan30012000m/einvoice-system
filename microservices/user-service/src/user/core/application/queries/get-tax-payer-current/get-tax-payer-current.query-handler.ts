import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetTaxPayerCurrentQuery,
  // GetTaxPayerCurrentQueryResult,
} from './get-tax-payer-current.query';

@QueryHandler(GetTaxPayerCurrentQuery)
export class GetTaxPayerCurrentQueryHandler
  implements IQueryHandler<GetTaxPayerCurrentQuery>
{
  // constructor(private readonly getTaxPayerCurrentPort: GetTaxPayerCurrentPort) {}

  public async execute({ payload }: GetTaxPayerCurrentQuery): Promise<void> {}
}
