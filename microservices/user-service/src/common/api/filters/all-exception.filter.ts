import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DomainException } from '../../ddd/oop/core/domain/exceptions/domain.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpException = this.getHttpException(exception);

    httpAdapter.reply(
      ctx.getResponse(),
      httpException.getResponse(),
      httpException.getStatus(),
    );
  }

  private getHttpException(exception: unknown) {
    if (exception instanceof HttpException) {
      console.log(exception.getResponse());
      return exception;
    }

    if (exception instanceof DomainException) {
      return new BadRequestException(exception.message);
    }

    if (exception instanceof Error) {
      return new InternalServerErrorException(exception.message);
    }

    return new InternalServerErrorException('Server Error');
  }
}
