import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { TaxPayerRegisteredEventDto } from './dtos/tax-payer-registered.event.dto';
import { TaxPayerActivatedEventDto } from './dtos/tax-payer-activated.event.dto';
import { TaxPayerUpdatedEventDto } from './dtos/tax-payer-updated.event.dto';
import { TaxPayerDeletedEventDto } from './dtos/tax-payer-deleted.event.dto';

import { TaxPayerRegisteredEventCommand } from 'src/invoice/core/application/commands/tax-payer-registered-event/tax-payer-registered-event.command';
import { TaxPayerActivatedEventCommand } from 'src/invoice/core/application/commands/tax-payer-activated-event/tax-payer-activated-event.command';
import { TaxPayerUpdatedEventCommand } from '../../core/application/commands/tax-payer-updated-event/tax-payer-updated-event.command';

@Controller()
export class ListenerEvent {
  private readonly logger = new Logger(ListenerEvent.name);
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern('tax-payer-registered')
  async TaxPayerRegisteredEvent(@Payload() event: TaxPayerRegisteredEventDto) {
    this.logger.debug(`> Event: ${JSON.stringify(event)}`);
    await this.commandBus.execute(
      new TaxPayerRegisteredEventCommand(
        event.newAddress,
        event.newBankDetail,
        event.newTaxPayer,
      ),
    );
  }

  @EventPattern('tax-payer-activated')
  async TaxPayerActivatedEvent(@Payload() event: TaxPayerActivatedEventDto) {
    this.logger.debug(`> Event: ${JSON.stringify(event)}`);
    await this.commandBus.execute(
      new TaxPayerActivatedEventCommand(event.taxCode, event.usbToken),
    );
  }

  @EventPattern('tax-payer-updated')
  async TaxPayerUpdatedEvent(@Payload() event: TaxPayerUpdatedEventDto) {
    this.logger.debug(`> Event: ${JSON.stringify(event)}`);
    await this.commandBus.execute(
      new TaxPayerUpdatedEventCommand(event.TaxPayer),
    );
  }

  @EventPattern('tax-payer-deleted')
  async TaxPayerDeletedEvent(@Payload() event: TaxPayerDeletedEventDto) {
    this.logger.debug(`> Event: ${JSON.stringify(event)}`);
    // await this.commandBus.execute(
    //   new RegisterTaxPayerCommand(
    //     event.newAddress,
    //     event.newBankDetail,
    //     event.newTaxPayer,
    //   ),
    // );
  }
}
