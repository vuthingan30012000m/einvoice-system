import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const url = req.url;
    const requestData = JSON.stringify(req.body);

    this.logger.log(`${method} ${url} - Request Data: ${requestData}`);

    next();
  }
}
