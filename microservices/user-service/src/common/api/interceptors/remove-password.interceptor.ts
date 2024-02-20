// import {
// Injectable,
// NestInterceptor,
// ExecutionContext,
// CallHandler,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class RemovePasswordInterceptor implements NestInterceptor {
// intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
// const httpContext = context.switchToHttp();
// const response = httpContext.getResponse();

// if (response) {
// return next.handle().pipe(
// map((data) => {
// const { password, ...result } = data;
// return result;
// }),
// );
// }

// return next.handle();
// }
// }
