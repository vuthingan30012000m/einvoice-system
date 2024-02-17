import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeValueInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data) {
          return this.excludeValue(data);
        }
        return data;
      }),
    );
  }

  private excludeValue(data: any): any {
    // Lặp qua các thuộc tính của đối tượng và kiểm tra nếu thuộc tính có key là "value"
    // thì loại bỏ "value" và giữ nguyên giá trị của nó
    Object.keys(data).forEach(key => {
      if (data[key]?.hasOwnProperty('value')) {
        data[key] = data[key].value;
      }
    });
    return data;
  }
}
