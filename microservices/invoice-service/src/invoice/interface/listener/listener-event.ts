import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TaxPayerRegisteredEventDto } from './dtos/tax-payer-registered.event.dto';
import { RegisterTaxPayerCommand } from 'src/invoice/core/application/commands/register-tax-payer/register-tax-payer.command';

export class ListenerEvent {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern('tax-payer-registered')
  async TaxPayerRegisteredEvent(
    @Payload() TaxPayerRegisteredEventDto: TaxPayerRegisteredEventDto,
  ) {
    // invoice-1      | 🚀 ~ TaxPayerRegisteredEvent ~ RegisterTaxPayerDto: {
    //   invoice-1      |   newAddress: {
    //   invoice-1      |     _id: { value: '1d21de7e-f97a-42b4-806e-15c641f13bd1' },
    //   invoice-1      |     WardId: { value: '00277' },
    //   invoice-1      |     note: '0173 Nader Circles'
    //   invoice-1      |   },
    //   invoice-1      |   newBankDetail: {
    //   invoice-1      |     _id: { value: '951a5758-48ae-4f13-be0d-a5601d1bb86f' },
    //   invoice-1      |     BankId: { value: '1' },
    //   invoice-1      |     accountBank: '54732012'
    //   invoice-1      |   },
    //   invoice-1      |   newTaxPayer: {
    //   invoice-1      |     _id: { value: 'd655190c-327b-4483-a2f9-d0fc1a040f4e' },
    //   invoice-1      |     name: 'Jesse Satterfield',
    //   invoice-1      |     password: 'bdcab3d6e33c93b8f9fd9c961fbe9a16e5083085d6c350dc24f3f46f282f765f4d1d6d28d175ace5176a542bc4a6561a5977a125826cfb22c57f01fa7b9f5736.d7b2e68da84bc0ff',
    //   invoice-1      |     email: { value: 'Jacques_Cassin@gmail.com' },
    //   invoice-1      |     phoneNumber: { value: '(542) 276-3441 x958' },
    //   invoice-1      |     taxOfficeId: { value: '1054029' },
    //   invoice-1      |     bankDetailId: { value: '951a5758-48ae-4f13-be0d-a5601d1bb86f' },
    //   invoice-1      |     addressId: { value: '1d21de7e-f97a-42b4-806e-15c641f13bd1' },
    //   invoice-1      |     taxPayerStatus: 'VERIFY_EMAIL'
    //   invoice-1      |   }
    //   invoice-1      | }

    return await this.commandBus.execute(
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
