import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaxPayerCommand } from './update-tax-payer.command';

import { BankDetailId } from './../../../domain/value-objects/bank-detail-id';
import { Bank } from './../../../domain/entities/bank';
import { BankId } from './../../../domain/value-objects/bank-id';
import { PhoneNumber } from './../../../domain/value-objects/phone-number';
import { TaxPayer } from 'src/user/core/domain/entities/tax-payer';
import { randomUUID } from 'crypto';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { TaxOfficeId } from 'src/user/core/domain/value-objects/tax-office-id';
import { BankDetail } from 'src/user/core/domain/entities/bank-detail';
import { Address } from 'src/user/core/domain/entities/address';
import { AddressId } from 'src/user/core/domain/value-objects/address-id';
import { WardId } from 'src/user/core/domain/value-objects/ward-id';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { TaxOfficeRepositoryPort } from '../../ports/dataaccess/repositories/tax-office.repository.port';
import { BankRepositoryPort } from '../../ports/dataaccess/repositories/bank.repository.port';
import { WardRepositoryPort } from '../../ports/dataaccess/repositories/ward.repository.port';
import { BankDetailRepositoryPort } from '../../ports/dataaccess/repositories/bank-detail.repository.port';
import { AddressRepositoryPort } from '../../ports/dataaccess/repositories/address.repository.port';

import { Email } from '../../../domain/value-objects/email';
import { TaxPayerStatus } from '../../../domain/value-objects/tax-payer-status';

import { TaxPayerRegisteredEvent } from 'src/user/core/domain/events/tax-payer-registered.event';
import { JwtService } from '@nestjs/jwt';
import { HashPasswordService } from '../../../domain/services/hash-password.service';
import { UsbTokenAuthenticationService } from 'src/user/core/domain/services/usb-token-authentication.service';
import { TaxPayerUpdatedEvent } from 'src/user/core/domain/events/tax-payer-updated.event';

@CommandHandler(UpdateTaxPayerCommand)
export class UpdateTaxPayerCommandHandler
  implements ICommandHandler<UpdateTaxPayerCommand>
{
  constructor(
    private readonly HashPasswordService: HashPasswordService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly eventBus: EventBus,
    private readonly TaxOfficeRepositoryPort: TaxOfficeRepositoryPort,
    private readonly BankRepository: BankRepositoryPort,
    private readonly WardRepository: WardRepositoryPort,
    private readonly BankDetailRepository: BankDetailRepositoryPort,
    private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationService,
    private readonly AddressRepository: AddressRepositoryPort,
  ) {}

  private readonly logger = new Logger(UpdateTaxPayerCommandHandler.name);

  public async execute(payload: UpdateTaxPayerCommand) {
    try {
      this.logger.log(`> UpdateTaxPayerCommand: ${JSON.stringify(payload)}`);

      const findTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.taxCode),
      );
      if (!findTaxPayer) {
        throw new Error('Người nộp thuế không tồn tại.');
      }

      const isValidUsbToken = await this.UsbTokenAuthenticationService.verify(
        payload.usbToken,
        findTaxPayer.usbToken,
      );

      if (!isValidUsbToken) {
        throw new TaxPayerException('Chữ ký số không đúng.');
      }

      if (payload.email !== findTaxPayer.email.value) {
        const existingEmail = await this.TaxPayerRepository.getOneByEmail(
          new Email(payload.email),
        );
        if (existingEmail) {
          throw new TaxPayerException('Email đã tồn tại.');
        }
      }

      if (payload.phoneNumber !== findTaxPayer.phoneNumber.value) {
        const existingPhoneNumber =
          await this.TaxPayerRepository.getOneByPhoneNumber(
            new PhoneNumber(payload.phoneNumber),
          );
        if (existingPhoneNumber) {
          throw new TaxPayerException('Số điện thoại đã tồn tại.');
        }
      }

      findTaxPayer.update(
        payload.name,
        new Email(payload.email),
        new PhoneNumber(payload.phoneNumber),
      );

      await this.TaxPayerRepository.save(findTaxPayer);

      this.eventBus.publish(new TaxPayerUpdatedEvent(findTaxPayer));

      const existingTaxOffice = await this.TaxOfficeRepositoryPort.getOneById(
        findTaxPayer.taxOfficeId,
      );
      const existingBankDetail = await this.BankDetailRepository.getOneById(
        findTaxPayer.bankDetailId,
      );
      const existingBank = await this.BankRepository.getOneById(
        existingBankDetail.BankId,
      );
      const existingAddress = await this.AddressRepository.getOneById(
        findTaxPayer.addressId,
      );
      const existingWard = await this.WardRepository.getOneById(
        existingAddress.WardId,
      );
      const {
        password,
        usbToken,
        taxOfficeId,
        bankDetailId,
        addressId,
        ...result
      } = findTaxPayer;

      return {
        ...result,
        taxOffice: {
          id: existingTaxOffice.taxOfficeId.value,
          name: existingTaxOffice.name,
        },
        bankDetail: {
          accountBank: existingBankDetail.accountBank,
          bank: {
            name: existingBank.name,
            code: existingBank.code,
            shortName: existingBank.shortName,
          },
        },
        address: {
          note: existingAddress.note,
          ward: {
            name: existingWard.name,
          },
        },
      };
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
