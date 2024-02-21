import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaxPayerRegisteredEventCommand } from './tax-payer-registered-event.command';

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { BankDetailRepositoryPort } from '../../ports/dataaccess/repositories/bank-detail.repository.port';
import { AddressRepositoryPort } from '../../ports/dataaccess/repositories/address.repository.port';

import { randomUUID } from 'crypto';

import { Address } from '../../../domain/entities/address';
import { AddressId } from '../../../domain/value-objects/address-id';
import { WardId } from '../../../domain/value-objects/ward-id';

import { BankDetail } from 'src/invoice/core/domain/entities/bank-detail';

import { BankDetailId } from './../../../domain/value-objects/bank-detail-id';
import { BankId } from './../../../domain/value-objects/bank-id';
import { PhoneNumber } from './../../../domain/value-objects/phone-number';
import { TaxPayer } from 'src/invoice/core/domain/entities/tax-payer';
import { TaxCode } from 'src/invoice/core/domain/value-objects/tax-code';

import { TaxOfficeId } from 'src/invoice/core/domain/value-objects/tax-office-id';

import { Email } from '../../../domain/value-objects/email';
import { TaxPayerStatus } from '../../../domain/value-objects/tax-payer-status';

@CommandHandler(TaxPayerRegisteredEventCommand)
export class TaxPayerRegisteredEventCommandHandler
  implements ICommandHandler<TaxPayerRegisteredEventCommand>
{
  private readonly logger = new Logger(
    TaxPayerRegisteredEventCommandHandler.name,
  );
  constructor(
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly BankDetailRepository: BankDetailRepositoryPort,
    private readonly AddressRepository: AddressRepositoryPort,
  ) {}

  public async execute(payload: TaxPayerRegisteredEventCommand) {
    try {
      this.logger.log(`> payload: ${JSON.stringify(payload)}`);

      const newAddress = Address.Builder(new AddressId(randomUUID()))
        .withWardId(new WardId(payload.newAddress.WardId.value))
        .withNoteAddress(payload.newAddress.note)
        .build();

      const newBankDetail = BankDetail.Builder(new BankDetailId(randomUUID()))
        .withBankId(new BankId(payload.newBankDetail.BankId.value))
        .withAccountBank(payload.newBankDetail.accountBank)
        .build();

      const newTaxPayer = TaxPayer.Builder(new TaxCode(randomUUID()))
        .withName(payload.newTaxPayer.name)
        .withPassword(payload.newTaxPayer.password)
        .withEmail(new Email(payload.newTaxPayer.email.value))
        .withPhoneNumber(new PhoneNumber(payload.newTaxPayer.phoneNumber.value))
        .withTaxOfficeId(new TaxOfficeId(payload.newTaxPayer.taxOfficeId.value))
        .withBankDetailId(new BankDetailId(newBankDetail.id.value))
        .withAddressId(new AddressId(newAddress.id.value))
        .withTaxPayerStatus(TaxPayerStatus.VERIFY_EMAIL)
        .build();

      await this.AddressRepository.save(newAddress);
      await this.BankDetailRepository.save(newBankDetail);
      await this.TaxPayerRepository.save(newTaxPayer);
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
