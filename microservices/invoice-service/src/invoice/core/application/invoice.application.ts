import { CqrsModule } from '@nestjs/cqrs';
import { TaxPayerRegisteredEventCommandHandler } from './commands/tax-payer-registered-event/tax-payer-registered-event.command-handler';
import { TaxPayerActivatedEventCommandHandler } from './commands/tax-payer-activated-event/tax-payer-activated-event.command-handler';
import { TaxPayerUpdatedEventCommandHandler } from './commands/tax-payer-updated-event/tax-payer-updated-event.command-handler';
import { TaxPayerDeletedEventCommandHandler } from './commands/tax-payer-deleted-event/tax-payer-deleted-event.command-handler';
import { FindTaxPayerQueryHandler } from './queries/find-tax-payer/find-tax-payer.query-handler';
import { CreateProductCommandHandler } from './commands/create-product/create-product.command-handler';
import { FindAllProductQueryHandler } from './queries/find-all-product/find-all-product.query-handler';
import { UsbTokenAuthenticationService } from '../domain/services/usb-token-authentication.service';
import { FindOneProductQueryHandler } from './queries/find-one-product/find-one-product.query-handler';
import { UpdateProductCommandHandler } from './commands/update-product/update-product.command-handler';
import { DeleteProductCommandHandler } from './commands/delete-product/delete-product.command-handler';
import { CreateNewInvoiceCommandHandler } from './commands/create-new-invoice/create-new-invoice.command-handler';

const InvoiceDomainServices: any[] = [UsbTokenAuthenticationService];
const InvoiceEventCommandHandlers: any[] = [
  TaxPayerRegisteredEventCommandHandler,
  TaxPayerActivatedEventCommandHandler,
  TaxPayerUpdatedEventCommandHandler,
  TaxPayerDeletedEventCommandHandler,
  CreateNewInvoiceCommandHandler
];
const InvoiceCommandHandlers: any[] = [
  CreateProductCommandHandler,
  UpdateProductCommandHandler,
  DeleteProductCommandHandler,
];
const InvoiceEventHandlers: any[] = [];
const InvoiceQueryHandlers: any[] = [
  FindTaxPayerQueryHandler,
  FindAllProductQueryHandler,
  FindOneProductQueryHandler,
];

export const InvoiceApplications = {
  imports: [CqrsModule],
  providers: [
    ...InvoiceDomainServices,
    ...InvoiceEventCommandHandlers,
    ...InvoiceCommandHandlers,
    ...InvoiceEventHandlers,
    ...InvoiceQueryHandlers,
  ],
};
