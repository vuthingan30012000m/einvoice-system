import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RequestResetPasswordQuery } from './request-reset-password.query';
import { Logger } from '@nestjs/common';

@QueryHandler(RequestResetPasswordQuery)
export class RequestResetPasswordQueryHandler
  implements IQueryHandler<RequestResetPasswordQuery>
{
  private readonly logger = new Logger(RequestResetPasswordQueryHandler.name);

  constructor() // private readonly JwtService: JwtService, // private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationService,
  // private readonly TaxPayerRepository: TaxPayerRepositoryPort,
  // private readonly HashPasswordService: HashPasswordService,
  {}

  public async execute(payload: RequestResetPasswordQuery) {
    try {
      this.logger.debug(
        `> RequestResetPasswordQuery: ${JSON.stringify(payload)}`,
      );

      console.log('🚀 ~ execute ~ payload:', payload);

      return 'accessToken';
    } catch (error) {
      return { error: error.message };
    }
  }
}
