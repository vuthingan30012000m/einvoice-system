import { CqrsModule } from '@nestjs/cqrs';
import { RegisterTaxPayerCommandHandler } from './commands/register-tax-payer/register-tax-payer.command-handler';

const InvoiceDomainServices: any[] = [];
const InvoiceCommandHandlers: any[] = [RegisterTaxPayerCommandHandler];
const InvoiceEventHandlers: any[] = [];
const InvoiceQueryHandlers: any[] = [];

export const InvoiceApplications = {
  imports: [CqrsModule],
  providers: [
    ...InvoiceDomainServices,
    ...InvoiceCommandHandlers,
    ...InvoiceEventHandlers,
    ...InvoiceQueryHandlers,
  ],
};
