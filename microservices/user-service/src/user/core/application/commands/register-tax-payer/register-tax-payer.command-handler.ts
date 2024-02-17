import { BankDetailId } from './../../../domain/value-objects/bank-detail-id';
import { Bank } from './../../../domain/entities/bank';
import { BankId } from './../../../domain/value-objects/bank-id';
import { PhoneNumber } from './../../../domain/value-objects/phone-number';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
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

@CommandHandler(RegisterTaxPayerCommand)
export class RegisterTaxPayerCommandHandler
  implements ICommandHandler<RegisterTaxPayerCommand>
{
  // constructor(private readonly registerTaxPayerPort: RegisterTaxPayerPort) {}

  private readonly logger = new Logger(RegisterTaxPayerCommandHandler.name);

  public async execute(payload: RegisterTaxPayerCommand): Promise<void> {
    this.logger.log(`> RegisterTaxPayerCommand:   ${JSON.stringify(payload)}`);

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

    console.log('🚀 ~ execute ~ newTaxPayer:', newTaxPayer);

    //     const newProduct = this.createProductPort.save(product);

    //     this.eventBus.publish(new ProductCreatedEvent(product));

    //     return newProduct;
    //   }
    // }
  }
}
