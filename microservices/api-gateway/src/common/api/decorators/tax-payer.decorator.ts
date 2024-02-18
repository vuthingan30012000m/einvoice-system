import {
  createParamDecorator,
  SetMetadata,
  ExecutionContext,
} from '@nestjs/common';

export interface TaxPayer {

// api_gateway-1  | 🚀 ~ register ~ TaxPayer: {
  // api_gateway-1  |   taxCode: 'bf7bf2dc-2eb8-47a0-bc27-14659eb6461b',
  // api_gateway-1  |   statusTaxPayer: 'VERIFY_EMAIL',
  // api_gateway-1  |   iat: 1708270739,
  // api_gateway-1  |   exp: 1708271039
  // api_gateway-1  | }
}



// import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

export const TaxPayer = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.taxPayer;
  },
);
