import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RequestResetPasswordQuery } from './request-reset-password.query';
import { Logger } from '@nestjs/common';
import { BankDetailId } from './../../../domain/value-objects/bank-detail-id';
import { Bank } from './../../../domain/entities/bank';
import { BankId } from './../../../domain/value-objects/bank-id';
import { PhoneNumber } from './../../../domain/value-objects/phone-number';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { TaxPayer } from '../../../domain/entities/tax-payer';
import { randomUUID } from 'crypto';
import { TaxCode } from '../../../domain/value-objects/tax-code';
import { Email } from '../../../domain/value-objects/email';
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

import { TaxPayerStatus } from '../../../domain/value-objects/tax-payer-status';
import { TaxPayerRegisteredEvent } from '../../../domain/events/tax-payer-registered.event';
import { JwtService } from '@nestjs/jwt';
import { HashPasswordService } from '../../../domain/services/hash-password.service';

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailerPort } from '../../ports/mailer/mailer.port';
import { EncryptionEmailService } from '../../../domain/services/encryption-email.service';

@QueryHandler(RequestResetPasswordQuery)
export class RequestResetPasswordQueryHandler
  implements IQueryHandler<RequestResetPasswordQuery>
{
  private readonly logger = new Logger(RequestResetPasswordQueryHandler.name);

  constructor(
    private readonly HashPasswordService: HashPasswordService,
    private readonly eventBus: EventBus,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly TaxOfficeRepository: TaxOfficeRepositoryPort,
    private readonly BankRepository: BankRepositoryPort,
    private readonly WardRepository: WardRepositoryPort,
    private readonly BankDetailRepository: BankDetailRepositoryPort,
    private readonly AddressRepository: AddressRepositoryPort,
    private readonly EncryptionEmailService: EncryptionEmailService,
    private readonly mailerPort: MailerPort,
  ) {}

  public async execute(payload: RequestResetPasswordQuery) {
    try {
      this.logger.debug(`> payload: ${JSON.stringify(payload)}`);

      const existingEmail = await this.TaxPayerRepository.getOneByEmail(
        new Email(payload.email),
      );
      if (!existingEmail) {
        throw new TaxPayerException('Không tìm thấy thông tin người nộp thuế.');
      }

      const tokenPassword = this.EncryptionEmailService.encrypt(
        payload.email + ' ' + new Date().toISOString(),
        process.env.VERIFY_RESET_PASSWORD_SECRET,
      );

      this.mailerPort.send(
        new Email(payload.email),
        'Đặt lại mật khẩu',
        'request-reset-password.hbs',
        {
          name: existingEmail.name,
          url: `${process.env.APP_DOMAIN}:${process.env.APP_PORT}/api/user/verify-reset-password/${tokenPassword}`,
        },
      );

      this.logger.log(
        `> Gửi đặt lại mật khẩu: ${JSON.stringify(payload.email)}`,
      );

      return {
        message: 'Yêu cầu quên mật khẩu thành công. Hãy kiểm tra email.',
      };
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
