import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewInvoiceCommand } from './create-new-invoice.command';

import { InvoiceException } from 'src/invoice/core/domain/exceptions/invoice.exception';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { ProductRepositoryPort } from '../../ports/dataaccess/repositories/product.repository.port';
import { InvoiceRepositoryPort } from '../../ports/dataaccess/repositories/invoice.repository.port';
import { InvoiceItemRepositoryPort } from '../../ports/dataaccess/repositories/invoice-item.repository.port';

import { UsbTokenAuthenticationService } from '../../../domain/services/usb-token-authentication.service';

import { TaxCode } from '../../../domain/value-objects/tax-code';
import { Invoice } from 'src/invoice/core/domain/entities/invoice';
import { InvoiceId } from '../../../domain/value-objects/invoice-id';
import { randomUUID } from 'crypto';
import { InvoiceItem } from 'src/invoice/core/domain/entities/invoice-item';
import { ProductId } from '../../../domain/value-objects/product-id';
import { Money } from '../../../domain/value-objects/money';

@CommandHandler(CreateNewInvoiceCommand)
export class CreateNewInvoiceCommandHandler
  implements ICommandHandler<CreateNewInvoiceCommand>
{
  constructor(
    private readonly ProductRepository: ProductRepositoryPort,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationService,
    private readonly InvoiceRepositoryPort: InvoiceRepositoryPort,
    private readonly InvoiceItemRepositoryPort: InvoiceItemRepositoryPort,
  ) {}

  private readonly logger = new Logger(CreateNewInvoiceCommandHandler.name);

  public async execute(payload: CreateNewInvoiceCommand) {
    try {
      this.logger.log(`> payload: ${JSON.stringify(payload)}`);

      const findTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.sellerId),
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

      const newInvoiceId = new InvoiceId(randomUUID());

      const newInvoiceItems = payload.invoiceItems.map((item) => {
        return (
          InvoiceItem.Builder(new InvoiceId(randomUUID()))
            // .withProductId(new ProductId(item.productId))
            // .withQuantity(Number(item.quantity))
            // .withPrice(new Money(Number(item.price)))
            .withSubTotal(new Money(0))
            // .withTaxRate(Number(item.taxRate))
            // .withInvoiceId(newInvoiceId)
            .build()
        );
      });

      const newInvoice = Invoice.Builder(newInvoiceId)
        // .withSellerId(new TaxCode(payload.sellerId))
        // .withBuyerId(new TaxCode(payload.buyerId))
        // .withItem(newInvoiceItems)
        .withTotalBeforeTax(new Money(0))
        .withTotalAfterTax(new Money(0))
        .build();

      this.InvoiceItemRepositoryPort.save(newInvoiceItems);
      // this.InvoiceRepositoryPort.save(newInvoice);
      return newInvoice;
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
