import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { CreateProductPort } from './create-product.port';

import { Product } from 'src/product/core/domain/entities/product';

import { randomUUID } from 'crypto';
import { ProductName } from './../../../domain/value-objects/product-name';
import { ProductCreatedEvent } from 'src/product/core/domain/events/product-created.event';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly createProductPort: CreateProductPort,
    private readonly eventBus: EventBus,
  ) {}

  private readonly logger = new Logger(CreateProductCommandHandler.name);

  public async execute(createProductCommand: CreateProductCommand) {
    this.logger.debug(
      `> CreateProductCommand:   ${JSON.stringify(createProductCommand)}`,
    );

    const product = Product.Builder(randomUUID())
      .withName(new ProductName(createProductCommand.name))
      .withCreatedAt(new Date())
      .build();

    const newProduct = this.createProductPort.save(product);

    this.eventBus.publish(new ProductCreatedEvent(product));

    return newProduct;
  }
}
