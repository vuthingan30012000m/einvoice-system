import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../../domain/events/product-created.event';
import { ProductCreatedPort } from './product-created.port.ts';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedEventHandler
  implements IEventHandler<ProductCreatedEvent>
{
  // constructor(private readonly productCreatedPort: ProductCreatedPort) {}

  private readonly logger = new Logger(ProductCreatedEventHandler.name);

  handle(productCreatedEvent: ProductCreatedEvent) {
    this.logger.debug(
      `> ProductCreatedEvent:   ${JSON.stringify(productCreatedEvent)}`,
    );
  }
}
