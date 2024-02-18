import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TaxPayerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    
        const request = context.switchToHttp().getRequest();
        console.log("🚀 ~ TaxPayerInterceptor ~ intercept ~ request:", request)
    
    
    
    
    
// @Injectable()
// export class ExtractUserIdInterceptor implements NestInterceptor {
//   constructor(private readonly jwtService: JwtService) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const token = request.headers.authorization?.split(' ')[1]; // Giả sử JWT được gửi dưới dạng "Bearer <token>"

//     if (token) {
//       const decoded = this.jwtService.verify(token);
//       request.user = decoded; // Lưu thông tin giải mã vào request.user hoặc bạn có thể trích xuất từ decoded để lấy user ID cụ thể
//     }

//     return next.handle();
//   }
// }
    
    
    
    
    return handler.handle();
    // return handler.handle().pipe(
    //   map((data) => {
    //     if (data) {
    //       return this.excludeValue(data);
    //     }
    //     return data;
    //   }),
    // );
  }

  // private excludeValue(data: any): any {
  //   Object.keys(data).forEach((key) => {
  //     if (data[key]?.hasOwnProperty('value')) {
  //       data[key] = data[key].value;
  //     }
  //   });
  //   return data;
  // }
}
