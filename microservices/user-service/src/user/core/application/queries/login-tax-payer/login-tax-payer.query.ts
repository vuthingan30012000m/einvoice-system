import { IQuery, IQueryResult } from '@nestjs/cqrs';

export class LoginTaxPayerQuery implements IQuery {
  constructor(public readonly payload: {}) {}
}

export class LoginTaxPayerQueryResult implements IQueryResult {
  constructor() {}
}
