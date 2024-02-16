import { CreateProductCommandHandler } from './commands/create-product/create-product.command-handler';
import { ProductCreatedEventHandler } from './event-handlers/product-created.event-handler';
import { FindAllProductQueryHandler } from './queries/find-all-product/find-all-product.query-handler';

const ProductQueryHandlers: any[] = [FindAllProductQueryHandler];
const ProductCommandHandlers: any[] = [CreateProductCommandHandler];
const ProductEventHandlers: any[] = [ProductCreatedEventHandler];

export const ProductApplications = [
  ...ProductQueryHandlers,
  ...ProductCommandHandlers,
  ...ProductEventHandlers,
];
