import { CqrsModule } from '@nestjs/cqrs';
import { TaxPayerRegisteredEventCommandHandler } from './commands/tax-payer-registered-event/tax-payer-registered-event.command-handler';
import { TaxPayerActivatedEventCommandHandler } from './commands/tax-payer-activated-event/tax-payer-activated-event.command-handler';
import { TaxPayerUpdatedEventCommandHandler } from './commands/tax-payer-updated-event/tax-payer-updated-event.command-handler';
import { TaxPayerDeletedEventCommandHandler } from './commands/tax-payer-deleted-event/tax-payer-deleted-event.command-handler';
import { FindTaxPayerQueryHandler } from './queries/find-tax-payer/find-tax-payer.query-handler';

const InvoiceDomainServices: any[] = [];
const InvoiceEventCommandHandlers: any[] = [
  TaxPayerRegisteredEventCommandHandler,
  TaxPayerActivatedEventCommandHandler,
  TaxPayerUpdatedEventCommandHandler,
  TaxPayerDeletedEventCommandHandler,
];
const InvoiceCommandHandlers: any[] = [];
const InvoiceEventHandlers: any[] = [];
const InvoiceQueryHandlers: any[] = [FindTaxPayerQueryHandler];

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
