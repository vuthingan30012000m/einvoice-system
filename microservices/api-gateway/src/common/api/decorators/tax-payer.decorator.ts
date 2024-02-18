import {
  createParamDecorator,
  SetMetadata,
  ExecutionContext,
} from '@nestjs/common';

export interface TaxPayerJwtPayload {
  taxCode: string;
  // statusTaxPayer: string;
  iat: number;
  exp: number;
}

export const TaxPayer = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.taxPayer;
  },
);
