import { BankDetailId } from './../../../domain/value-objects/bank-detail-id';
import { Bank } from './../../../domain/entities/bank';
import { BankId } from './../../../domain/value-objects/bank-id';
import { PhoneNumber } from './../../../domain/value-objects/phone-number';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterTaxPayerCommand } from './register-tax-payer.command';
import { TaxPayer } from 'src/user/core/domain/entities/tax-payer';
import { randomUUID } from 'crypto';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { Email } from 'src/user/core/domain/value-objects/email';
import { TaxOfficeId } from 'src/user/core/domain/value-objects/tax-office-id';
import { BankDetail } from 'src/user/core/domain/entities/bank-detail';
import { Address } from 'src/user/core/domain/entities/address';
import { AddressId } from 'src/user/core/domain/value-objects/address-id';
import { WardId } from 'src/user/core/domain/value-objects/ward-id';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';

import { TaxPayerRepository } from '../../ports/dataaccess/repositories/tax-payer.repository';
import { TaxOfficeRepository } from '../../ports/dataaccess/repositories/tax-office.repository';
import { BankRepository } from '../../ports/dataaccess/repositories/bank.repository';
import { WardRepositoryPort } from '../../ports/dataaccess/repositories/ward.repository';
import { BankDetailRepository } from '../../ports/dataaccess/repositories/bank-detail.repository';
import { AddressRepository } from '../../ports/dataaccess/repositories/address.repository';
import { TaxPayerStatus } from 'src/user/core/domain/value-objects/tax-payer-status';
import { TaxPayerRegisteredEvent } from 'src/user/core/domain/events/tax-payer-registered.event';

@CommandHandler(RegisterTaxPayerCommand)
export class RegisterTaxPayerCommandHandler
  implements ICommandHandler<RegisterTaxPayerCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly TaxPayerRepository: TaxPayerRepository,
    private readonly TaxOfficeRepository: TaxOfficeRepository,
    private readonly BankRepository: BankRepository,
    private readonly WardRepository: WardRepositoryPort,
    private readonly BankDetailRepository: BankDetailRepository,
    private readonly AddressRepository: AddressRepository,
  ) {}

  private readonly logger = new Logger(RegisterTaxPayerCommandHandler.name);

  public async execute(payload: RegisterTaxPayerCommand) {
    try {
      this.logger.log(`> RegisterTaxPayerCommand: ${JSON.stringify(payload)}`);

      // const existingEmail = await this.TaxPayerRepository.getOneByEmail(
      // new Email(payload.email),
      // );
      // if (existingEmail) {
      // throw new TaxPayerException('Email đã tồn tại.');
      // }
      // console.log('🚀 ~ execute ~ exitingBankDetail:');

      // const existingPhoneNumber =
      // await this.TaxPayerRepository.getOneByPhoneNumber(
      // new PhoneNumber(payload.phoneNumber),
      // );
      // if (existingPhoneNumber) {
      // throw new TaxPayerException('Số điện thoại đã tồn tại.');
      // }

      // const existingTaxOffice = await this.TaxOfficeRepository.getOneById(
      // new TaxOfficeId(payload.taxOfficeId),
      // );
      // if (!existingTaxOffice) {
      // throw new TaxPayerException('Cơ quan thuế không tồn tại');
      // }

      // const existingBank = await this.BankRepository.getOneById(
      // new BankId(payload.bankId),
      // );
      // if (!existingBank) {
      // throw new TaxPayerException('Ngân hàng không tồn tại');
      // }

      // const exitingWard = await this.WardRepository.getOneById(
      // new WardId(payload.wardId),
      // );
      // if (!exitingWard) {
      // throw new TaxPayerException('Phường/xã không tồn tại');
      // }

      // const exitingBankDetail = await this.BankDetailRepository.getAccountBank(
      // payload.accountBank,
      // new BankId(payload.bankId),
      // );
      // if (exitingBankDetail) {
      // throw new TaxPayerException('Tài khoản ngân hàng đã tồn tại');
      // }

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
        .withBankDetailId(new BankDetailId(newBankDetail.id.value))
        .withAddressId(new AddressId(newAddress.id.value))
        .withTaxPayerStatus(TaxPayerStatus.PENDING)
        .build();

      await this.AddressRepository.save(newAddress);
      await this.BankDetailRepository.save(newBankDetail);
      await this.TaxPayerRepository.save(newTaxPayer);

      this.eventBus.publish(new TaxPayerRegisteredEvent(newTaxPayer));

      return newTaxPayer;
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { error: error.message };
    }
  }
}
