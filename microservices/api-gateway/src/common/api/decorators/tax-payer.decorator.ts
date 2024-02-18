import {createParamDecorator, SetMetadata } from '@nestjs/common';
// import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

export const TaxPayer = createParamDecorator(() => {
  return {
    taxCode: '123456789',
    // name: 'Nguyen Van A',
  }
})


// @Injectable()
// export class ExtractUserIdInterceptor implements NestInterceptor {
//   constructor(private readonly jwtService: JwtService) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers.authorization?.split(' ')[1]; // Giả sử JWT được gửi dưới dạng "Bearer <token>"
    
//     if (token) {
//       const decoded = this.jwtService.verify(token);
//       request.user = decoded; // Lưu thông tin giải mã vào request.user hoặc bạn có thể trích xuất từ decoded để lấy user ID cụ thể
//     }

//     return next.handle();
//   }
// }
