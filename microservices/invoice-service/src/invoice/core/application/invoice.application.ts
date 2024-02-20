import { CqrsModule } from '@nestjs/cqrs';

const InvoiceDomainServices: any[] = [];
const InvoiceCommandHandlers: any[] = [];
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
