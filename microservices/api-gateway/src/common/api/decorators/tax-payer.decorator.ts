import { createParamDecorator, SetMetadata } from '@nestjs/common';
// import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

export const TaxPayer = createParamDecorator(() => {
  return {
    taxCode: '123456789',
    // name: 'Nguyen Van A',
  };
});

