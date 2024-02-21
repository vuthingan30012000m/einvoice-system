import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { RegisterTaxPayerCommand } from 'src/invoice/core/application/commands/register-tax-payer/register-tax-payer.command';

import { TaxPayerRegisteredEventDto } from './dtos/tax-payer-registered.event.dto';
import { TaxPayerActivatedEventDto } from './dtos/tax-payer-activated.event.dto';
import { TaxPayerUpdatedEventDto } from './dtos/tax-payer-updated.event.dto';
import { TaxPayerDeletedEventDto } from './dtos/tax-payer-deleted.event.dto';

@Controller()
export class ListenerEvent {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @EventPattern('tax-payer-registered')
  async TaxPayerRegisteredEvent(
    @Payload() TaxPayerRegisteredEventDto: TaxPayerRegisteredEventDto,
  ) {
    await this.commandBus.execute(
      new RegisterTaxPayerCommand(
        TaxPayerRegisteredEventDto.newAddress,
        TaxPayerRegisteredEventDto.newBankDetail,
        TaxPayerRegisteredEventDto.newTaxPayer,
      ),
    );
  }

  @EventPattern('tax-payer-activated')
  async TaxPayerActivatedEvent(
    @Payload() TaxPayerActivatedEventDto: TaxPayerActivatedEventDto,
  ) {
    await this.commandBus.execute(
      new RegisterTaxPayerCommand(
        TaxPayerActivatedEventDto.newAddress,
        TaxPayerActivatedEventDto.newBankDetail,
        TaxPayerActivatedEventDto.newTaxPayer,
      ),
    );
  }

  @EventPattern('tax-payer-updated')
  async TaxPayerUpdatedEvent(
    @Payload() TaxPayerUpdatedEventDto: TaxPayerUpdatedEventDto,
  ) {
    await this.commandBus.execute(
      new RegisterTaxPayerCommand(
        TaxPayerUpdatedEventDto.newAddress,
        TaxPayerUpdatedEventDto.newBankDetail,
        TaxPayerUpdatedEventDto.newTaxPayer,
      ),
    );
  }

  @EventPattern('tax-payer-deleted')
  async TaxPayerDeletedEvent(
    @Payload() TaxPayerDeletedEventDto: TaxPayerDeletedEventDto,
  ) {
    await this.commandBus.execute(
      new RegisterTaxPayerCommand(
        TaxPayerDeletedEventDto.newAddress,
        TaxPayerDeletedEventDto.newBankDetail,
        TaxPayerDeletedEventDto.newTaxPayer,
      ),
    );
  }
}
