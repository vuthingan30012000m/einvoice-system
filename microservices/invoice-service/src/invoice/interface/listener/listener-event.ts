import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { RegisterTaxPayerCommand } from 'src/invoice/core/application/commands/register-tax-payer/register-tax-payer.command';

import { TaxPayerRegisteredEventDto } from './dtos/tax-payer-registered.event.dto';
import { TaxPayerActivatedEventDto } from './dtos/tax-payer-activated.event.dto';
import { TaxPayerUpdatedEventDto } from './dtos/tax-payer-updated.event.dto';
import { TaxPayerDeletedEventDto } from './dtos/tax-payer-deleted.event.dto';

@Controller()
export class ListenerEvent {
  private readonly logger = new Logger(ListenerEvent.name);
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern('tax-payer-registered')
  async TaxPayerRegisteredEvent(@Payload() event: TaxPayerRegisteredEventDto) {
    this.logger.debug(`> Event: ${JSON.stringify(event)}`);
    await this.commandBus.execute(
      new RegisterTaxPayerCommand(
        event.newAddress,
        event.newBankDetail,
        event.newTaxPayer,
      ),
    );
  }

  @EventPattern('tax-payer-activated')
  async TaxPayerActivatedEvent(@Payload() event: TaxPayerActivatedEventDto) {
    this.logger.debug(`> Event: ${JSON.stringify(event)}`);
    console.log(event.taxCode);

  }

  @EventPattern('tax-payer-updated')
  async TaxPayerUpdatedEvent(
    @Payload() event: TaxPayerUpdatedEventDto,
  ) {
    this.logger.debug(`> Event: ${JSON.stringify(event)}`);
    // await this.commandBus.execute(
    //   new RegisterTaxPayerCommand(
    //     TaxPayerUpdatedEventDto.newAddress,
    //     TaxPayerUpdatedEventDto.newBankDetail,
    //     TaxPayerUpdatedEventDto.newTaxPayer,
    //   ),
    // );
  }

  @EventPattern('tax-payer-deleted')
  async TaxPayerDeletedEvent(
    @Payload() event: TaxPayerDeletedEventDto,
  ) {
    this.logger.debug(`> Event: ${JSON.stringify(event)}`);
    // await this.commandBus.execute(
    //   new RegisterTaxPayerCommand(
    //     TaxPayerDeletedEventDto.newAddress,
    //     TaxPayerDeletedEventDto.newBankDetail,
    //     TaxPayerDeletedEventDto.newTaxPayer,
    //   ),
    // );
  }
}
