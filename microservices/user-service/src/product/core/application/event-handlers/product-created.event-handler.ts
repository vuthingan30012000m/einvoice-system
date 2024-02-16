import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../../domain/events/product-created.event';
import { ProductCreatedPort } from './product-created.port.ts';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedEventHandler
  implements IEventHandler<ProductCreatedEvent>
{
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  // constructor(private readonly productCreatedPort: ProductCreatedPort) {}

  private readonly logger = new Logger(ProductCreatedEventHandler.name);

  handle(productCreatedEvent: ProductCreatedEvent) {
    this.logger.debug(
      `> ProductCreatedEvent:   ${JSON.stringify(productCreatedEvent)}`,
    );
    this.natsClient.emit('product_created', productCreatedEvent);
  }
}
