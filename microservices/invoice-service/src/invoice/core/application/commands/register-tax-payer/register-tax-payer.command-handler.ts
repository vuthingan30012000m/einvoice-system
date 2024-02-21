import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterTaxPayerCommand } from './register-tax-payer.command';

// import { BankDetailId } from './../../../domain/value-objects/bank-detail-id';
// import { Bank } from './../../../domain/entities/bank';
// import { BankId } from './../../../domain/value-objects/bank-id';
// import { PhoneNumber } from './../../../domain/value-objects/phone-number';
// import { Logger } from '@nestjs/common';
// import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
// import { RegisterTaxPayerCommand } from './register-tax-payer.command';
// import { TaxPayer } from '../../../domain/entities/tax-payer';
import { randomUUID } from 'crypto';
// import { TaxCode } from '../../../domain/value-objects/tax-code';
// import { Email } from '../../../domain/value-objects/email';
// import { TaxOfficeId } from '../../../domain/value-objects/tax-office-id';
// import { BankDetail } from '../../../domain/entities/bank-detail';
import { Address } from '../../../domain/entities/address';
import { AddressId } from '../../../domain/value-objects/address-id';
import { WardId } from '../../../domain/value-objects/ward-id';
// import { TaxPayerException } from '../../../domain/exceptions/tax-payer.exception';

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { TaxOfficeRepositoryPort } from '../../ports/dataaccess/repositories/tax-office.repository.port';
import { BankRepositoryPort } from '../../ports/dataaccess/repositories/bank.repository.port';
import { WardRepositoryPort } from '../../ports/dataaccess/repositories/ward.repository.port';
import { BankDetailRepositoryPort } from '../../ports/dataaccess/repositories/bank-detail.repository.port';
import { AddressRepositoryPort } from '../../ports/dataaccess/repositories/address.repository.port';

// import { TaxPayerStatus } from '../../../domain/value-objects/tax-payer-status';
// import { TaxPayerRegisteredEvent } from '../../../domain/events/tax-payer-registered.event';
// import { JwtService } from '@nestjs/jwt';
// import { HashPasswordService } from '../../../domain/services/hash-password.service';

@CommandHandler(RegisterTaxPayerCommand)
export class RegisterTaxPayerCommandHandler
  implements ICommandHandler<RegisterTaxPayerCommand>
{
  constructor(
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly BankDetailRepository: BankDetailRepositoryPort,
    private readonly AddressRepository: AddressRepositoryPort,
  ) {}

  private readonly logger = new Logger(RegisterTaxPayerCommandHandler.name);

  public async execute(payload: RegisterTaxPayerCommand) {
    try {
      this.logger.log(`> : ${JSON.stringify(payload)}`);

      await this.AddressRepository.save(payload.newAddress);
      await this.BankDetailRepository.save(payload.newBankDetail);
      await this.TaxPayerRepository.save(payload.newTaxPayer);
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
