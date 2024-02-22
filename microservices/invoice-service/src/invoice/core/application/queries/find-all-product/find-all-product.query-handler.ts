import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllProductQuery } from './find-all-product.query';
import { Logger } from '@nestjs/common';
import { TaxCode } from '../../../domain/value-objects/tax-code';

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { ProductRepositoryPort } from '../../ports/dataaccess/repositories/product.repository.port';
import { UsbTokenAuthenticationService } from '../../../domain/services/usb-token-authentication.service';
import { InvoiceException } from '../../../domain/exceptions/invoice.exception';

@QueryHandler(FindAllProductQuery)
export class FindAllProductQueryHandler
  implements IQueryHandler<FindAllProductQuery>
{
  private readonly logger = new Logger(FindAllProductQueryHandler.name);

  constructor(
    private readonly ProductRepository: ProductRepositoryPort,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationService,
  ) {}

  public async execute(payload: FindAllProductQuery) {
    try {
      this.logger.debug(`> payload: ${JSON.stringify(payload)}`);

      const findTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.taxPayerId),
      );
      if (!findTaxPayer) {
        throw new Error('Người nộp thuế không tồn tại.');
      }

      const isValidUsbToken = await this.UsbTokenAuthenticationService.verify(
        payload.usbToken,
        findTaxPayer.usbToken,
      );

      if (!isValidUsbToken) {
        throw new InvoiceException('Chữ ký số không đúng.');
      }

      return await this.ProductRepository.getAll();
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
