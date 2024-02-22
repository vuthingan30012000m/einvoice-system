import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewInvoiceCommand } from './create-new-invoice.command';

import { InvoiceException } from 'src/invoice/core/domain/exceptions/invoice.exception';
import { ProductRepositoryPort } from '../../ports/dataaccess/repositories/product.repository.port';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { UsbTokenAuthenticationService } from '../../../domain/services/usb-token-authentication.service';
import { TaxCode } from '../../../domain/value-objects/tax-code';
import { Invoice } from 'src/invoice/core/domain/entities/invoice';
import { InvoiceId } from '../../../domain/value-objects/invoice-id';
import { randomUUID } from 'crypto';
import { SellerId } from 'src/invoice/core/domain/value-objects/seller-id';
import { BuyerId } from 'src/invoice/core/domain/value-objects/buyer-id';
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
        return InvoiceItem.Builder(new InvoiceId(randomUUID()))
          .withProductId(new ProductId(item.productId))
          .withQuantity(Number(item.quantity))
          .withPrice(new Money(Number(item.price)))
          .withSubTotal(new Money(0))
          .withTaxRate(Number(item.taxRate))
          .withInvoiceId(newInvoiceId)
          .build();
      });

      const newInvoice = Invoice.Builder(newInvoiceId)
        .withSellerId(new SellerId(payload.sellerId))
        .withBuyerId(new BuyerId(payload.buyerId))
        .withItem(newInvoiceItems)
        .withTotalBeforeTax(new Money(0))
        .withTotalAfterTax(new Money(0))
        .build();

      // save 1
      // save 2
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
