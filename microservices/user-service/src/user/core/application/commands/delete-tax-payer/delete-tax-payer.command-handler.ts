import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaxPayerCommand } from './delete-tax-payer.command';

import { BankDetailId } from './../../../domain/value-objects/bank-detail-id';
import { Bank } from './../../../domain/entities/bank';
import { BankId } from './../../../domain/value-objects/bank-id';
import { PhoneNumber } from './../../../domain/value-objects/phone-number';
import { TaxPayer } from '../../../domain/entities/tax-payer';
import { randomUUID } from 'crypto';
import { TaxCode } from '../../../domain/value-objects/tax-code';
import { TaxOfficeId } from '../../../domain/value-objects/tax-office-id';
import { BankDetail } from '../../../domain/entities/bank-detail';
import { Address } from '../../../domain/entities/address';
import { AddressId } from '../../../domain/value-objects/address-id';
import { WardId } from '../../../domain/value-objects/ward-id';
import { TaxPayerException } from '../../../domain/exceptions/tax-payer.exception';

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { TaxOfficeRepositoryPort } from '../../ports/dataaccess/repositories/tax-office.repository.port';
import { BankRepositoryPort } from '../../ports/dataaccess/repositories/bank.repository.port';
import { WardRepositoryPort } from '../../ports/dataaccess/repositories/ward.repository.port';
import { BankDetailRepositoryPort } from '../../ports/dataaccess/repositories/bank-detail.repository.port';
import { AddressRepositoryPort } from '../../ports/dataaccess/repositories/address.repository.port';

import { Email } from '../../../domain/value-objects/email';
import { TaxPayerStatus } from '../../../domain/value-objects/tax-payer-status';

import { TaxPayerRegisteredEvent } from '../../../domain/events/tax-payer-registered.event';
import { JwtService } from '@nestjs/jwt';
import { HashPasswordService } from '../../../domain/services/hash-password.service';
import { UsbTokenAuthenticationService } from '../../../domain/services/usb-token-authentication.service';
import { TaxPayerDeletedEvent } from '../../../domain/events/tax-payer-deleted.event';

@CommandHandler(DeleteTaxPayerCommand)
export class DeleteTaxPayerCommandHandler
  implements ICommandHandler<DeleteTaxPayerCommand>
{
  constructor(
    private readonly HashPasswordService: HashPasswordService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly TaxOfficeRepository: TaxOfficeRepositoryPort,
    private readonly BankRepository: BankRepositoryPort,
    private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationService,
    private readonly WardRepository: WardRepositoryPort,
    private readonly BankDetailRepository: BankDetailRepositoryPort,
    private readonly AddressRepository: AddressRepositoryPort,

    private readonly eventBus: EventBus,
  ) {}

  private readonly logger = new Logger(DeleteTaxPayerCommandHandler.name);

  public async execute(payload: DeleteTaxPayerCommand) {
    try {
      this.logger.log(`> payload: ${JSON.stringify(payload)}`);

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

      findTaxPayer.delete();

      await this.TaxPayerRepository.save(findTaxPayer);

      this.eventBus.publish(new TaxPayerDeletedEvent(findTaxPayer));

      return { message: 'Xóa tài khoản người nộp thuế thành công.' };
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
