import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

export class ListenerEvent {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}



  @EventPattern('tax-payer-registered')
  async TaxPayerRegisteredEvent(@Payload() RegisterTaxPayerDto: any) {
    console.log("🚀 ~ TaxPayerRegisteredEvent ~ RegisterTaxPayerDto:", RegisterTaxPayerDto)
    // async TaxPayerRegisteredEvent(@Payload() RegisterTaxPayerDto: RegisterTaxPayerDto) {
    // return await this.commandBus.execute(
    //   new RegisterTaxPayerCommand(
    //     registerTaxPayerDto.name,
    //     registerTaxPayerDto.password,
    //     registerTaxPayerDto.email,
    //     registerTaxPayerDto.phoneNumber,
    //     registerTaxPayerDto.taxOfficeId,
    //     registerTaxPayerDto.bankId,
    //     registerTaxPayerDto.accountBank,
    //     registerTaxPayerDto.wardId,
    //     registerTaxPayerDto.noteAddress,
    //   ),
    // );
  }

  @EventPattern('tax-payer-updated')
  async TaxPayerUpdatedEvent(@Payload() data: any) {
  }

  @EventPattern('tax-payer-deleted')
  async TaxPayerDeletedEvent(@Payload() data: any) {
  }
}




// @MessagePattern({ cmd: 'update-tax-payer' })
// async updateTaxPayer(@Payload() updateTaxPayerDto: UpdateTaxPayerDto) {
//   return await this.commandBus.execute(
//     new UpdateTaxPayerCommand(
//       updateTaxPayerDto.taxCode,
//       updateTaxPayerDto.name,
//       updateTaxPayerDto.email,
//       updateTaxPayerDto.phoneNumber,
//       updateTaxPayerDto.usbToken,
//     ),
//   );
// }
// @MessagePattern({ cmd: 'delete-tax-payer' })
// async deleteTaxPayer(@Payload() deleteTaxPayerDto: DeleteTaxPayerDto) {
//   return await this.commandBus.execute(
//     new DeleteTaxPayerCommand(
//       deleteTaxPayerDto.taxCode,
//       deleteTaxPayerDto.usbToken,
//     ),