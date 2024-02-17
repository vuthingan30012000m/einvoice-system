import { BankDetailId } from './../../../domain/value-objects/bank-detail-id';
import { Bank } from './../../../domain/entities/bank';
import { BankId } from './../../../domain/value-objects/bank-id';
import { PhoneNumber } from './../../../domain/value-objects/phone-number';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterTaxPayerCommand } from './register-tax-payer.command';
import { RegisterTaxPayerPort } from './register-tax-payer.port';
import { TaxPayer } from 'src/user/core/domain/entities/tax-payer';
import { randomUUID } from 'crypto';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxOfficeId } from 'src/user/core/domain/value-objects/tax-office-id';
import { BankDetail } from 'src/user/core/domain/entities/bank-detail';
import { Address } from 'src/user/core/domain/entities/address';
import { AddressId } from 'src/user/core/domain/value-objects/address-id';
import { WardId } from 'src/user/core/domain/value-objects/ward-id';
import { TaxPayerDomainService } from 'src/user/core/domain/tax-payer.domain-service';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';

@CommandHandler(RegisterTaxPayerCommand)
export class RegisterTaxPayerCommandHandler
  implements ICommandHandler<RegisterTaxPayerCommand>
{
  constructor(
    private readonly taxPayerDomainService: TaxPayerDomainService,
    private readonly registerTaxPayerPort: RegisterTaxPayerPort,
    private readonly eventBus: EventBus,
  ) {}

  private readonly logger = new Logger(RegisterTaxPayerCommandHandler.name);

  public async execute(payload: RegisterTaxPayerCommand) {
    try {
    this.logger.log(`> RegisterTaxPayerCommand:   ${JSON.stringify(payload)}`);

    const exitingWard = await this.registerTaxPayerPort.getWardById(
      payload.wardId,
    ); 



    if (!exitingWard) {
      throw new TaxPayerException('Ward not found');
    }



    const existingBank = await this.registerTaxPayerPort.getBankById(
      payload.bankId,
    ); 

    if (!existingBank) {
      throw new TaxPayerException('Bank not found');
    }

    const newAddress = Address.Builder(new AddressId(randomUUID()))
      .withWardId(new WardId(payload.wardId))
      .withNoteAddress(payload.noteAddress)
      .build();

    const newBankDetail = BankDetail.Builder(new BankDetailId(randomUUID()))
      .withBankId(new BankId(payload.bankId))
      .withAccountBank(payload.accountBank)
      .build();

    const newTaxPayer = TaxPayer.Builder(new TaxCode(randomUUID()))
      .withName(payload.name)
      .withPassword(payload.password)
      .withEmail(new Email(payload.email))
      .withPhoneNumber(new PhoneNumber(payload.phoneNumber))
      .withTaxOfficeId(new TaxOfficeId(payload.taxOfficeId))
      .withBankId(newBankDetail.id)
      .withAddressId(newAddress.id)
      .build();

    // const eventXXX=this.taxPayerDomainService.RegisterTaxPayer(newTaxPayer,newBankDetail,newAddress)

    await this.registerTaxPayerPort.saveAddress(newAddress);
    await this.registerTaxPayerPort.saveBankDetail(newBankDetail);
    console.log("🚀 ~ execute ~ newTaxPayer:", newTaxPayer)
    await this.registerTaxPayerPort.saveTaxPayer(newTaxPayer);
    // this.eventBus.publish(new ProductCreatedEvent(product));
    return 'newTaxPayer';
  }catch (error) {
    this.logger.error(`> ${error}`);
  }
}
}
