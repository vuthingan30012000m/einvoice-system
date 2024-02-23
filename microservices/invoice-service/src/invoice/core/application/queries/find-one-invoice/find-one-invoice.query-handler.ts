import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneInvoiceQuery } from './find-one-invoice.query';
import { Logger } from '@nestjs/common';

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { ProductRepositoryPort } from '../../ports/dataaccess/repositories/product.repository.port';
import { UsbTokenAuthenticationService } from '../../../domain/services/usb-token-authentication.service';
import { InvoiceException } from '../../../domain/exceptions/invoice.exception';
import { TaxCode } from '../../../domain/value-objects/tax-code';
import { ProductId } from '../../../domain/value-objects/product-id';
import { InvoiceRepositoryPort } from '../../ports/dataaccess/repositories/invoice.repository.port';
import { InvoiceId } from '../../../domain/value-objects/invoice-id';

@QueryHandler(FindOneInvoiceQuery)
export class FindOneInvoiceQueryHandler
  implements IQueryHandler<FindOneInvoiceQuery>
{
  private readonly logger = new Logger(FindOneInvoiceQueryHandler.name);

  constructor(
    private readonly ProductRepository: ProductRepositoryPort,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationService,
    private readonly InvoiceRepositoryPort: InvoiceRepositoryPort,
  ) {}

  public async execute(payload: FindOneInvoiceQuery) {
    try {
      this.logger.debug(`> payload: ${JSON.stringify(payload)}`);

      const findTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.taxPayerId),
      );
      if (!findTaxPayer) {
        throw new InvoiceException('Người nộp thuế không tồn tại.');
      }

      const isValidUsbToken = await this.UsbTokenAuthenticationService.verify(
        payload.usbToken,
        findTaxPayer.usbToken,
      );

      if (!isValidUsbToken) {
        throw new InvoiceException('Chữ ký số không đúng.');
      }

      return await this.InvoiceRepositoryPort.getOneById(
        new InvoiceId(payload.invoiceId),
      );
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
