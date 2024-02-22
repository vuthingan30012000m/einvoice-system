import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from '@nestjs/common';
import { FindOneProductQuery,   } from "./find-one-product.query";

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { ProductRepositoryPort } from '../../ports/dataaccess/repositories/product.repository.port';
import { UsbTokenAuthenticationService } from '../../../domain/services/usb-token-authentication.service';
import { InvoiceException } from '../../../domain/exceptions/invoice.exception';

@QueryHandler(FindOneProductQuery)
export class FindOneProductQueryHandler implements IQueryHandler<FindOneProductQuery> {
  
  private readonly logger = new Logger(FindOneProductQueryHandler.name);

  constructor(
    private readonly ProductRepository: ProductRepositoryPort,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationService,
  ) {}

  public async execute(payload : FindOneProductQuery) {
    try {
      this.logger.debug(`> payload: ${JSON.stringify(payload)}`);

    return await this.ProductRepository.getAll();
  } catch (error) {
    this.logger.error(`> ${error}`);
    return { message: error.message };
  }
}
}
