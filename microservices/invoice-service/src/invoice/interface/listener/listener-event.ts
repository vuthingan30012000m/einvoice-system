import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { TaxPayerRegisteredEventDto } from './dtos/tax-payer-registered.event.dto';
import { RegisterTaxPayerCommand } from 'src/invoice/core/application/commands/register-tax-payer/register-tax-payer.command';

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
      // return await this.commandBus.execute(
      new RegisterTaxPayerCommand(
        TaxPayerRegisteredEventDto.newAddress,
        TaxPayerRegisteredEventDto.newBankDetail,
        TaxPayerRegisteredEventDto.newTaxPayer,
      ),
    );
  }

  @EventPattern('tax-payer-updated')
  async TaxPayerUpdatedEvent(@Payload() data: any) {}

  @EventPattern('tax-payer-deleted')
  async TaxPayerDeletedEvent(@Payload() data: any) {}
}

// @MessagePattern({ cmd: 'update-tax-payer' })
// async updateTaxPayer(@Payload() updateTaxPayerDto: UpdateTaxPayerDto) {
// return await this.commandBus.execute(
// new UpdateTaxPayerCommand(
// updateTaxPayerDto.taxCode,
// updateTaxPayerDto.name,
// updateTaxPayerDto.email,
// updateTaxPayerDto.phoneNumber,
// updateTaxPayerDto.usbToken,
// ),
// );
// }
// @MessagePattern({ cmd: 'delete-tax-payer' })
// async deleteTaxPayer(@Payload() deleteTaxPayerDto: DeleteTaxPayerDto) {
// return await this.commandBus.execute(
// new DeleteTaxPayerCommand(
// deleteTaxPayerDto.taxCode,
// deleteTaxPayerDto.usbToken,
// ),
