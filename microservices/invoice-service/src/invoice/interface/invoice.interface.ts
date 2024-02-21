import { InvoiceController } from './http/controllers/invoice.controller';
import { ListenerEvent } from './listener/listener-event';

export const InvoiceInterface = {
  resolvers: [],
  controllers: [InvoiceController, ListenerEvent],
};
