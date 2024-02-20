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
// import { TaxPayer } from 'src/user/core/domain/entities/tax-payer';
// import { randomUUID } from 'crypto';
// import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
// import { Email } from 'src/user/core/domain/value-objects/email';
// import { TaxOfficeId } from 'src/user/core/domain/value-objects/tax-office-id';
// import { BankDetail } from 'src/user/core/domain/entities/bank-detail';
import { Address } from 'src/user/core/domain/entities/address';
import { AddressId } from 'src/user/core/domain/value-objects/address-id';
import { WardId } from 'src/user/core/domain/value-objects/ward-id';
// import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';

// import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
// import { TaxOfficeRepositoryPort } from '../../ports/dataaccess/repositories/tax-office.repository.port';
// import { BankRepositoryPort } from '../../ports/dataaccess/repositories/bank.repository.port';
// import { WardRepositoryPort } from '../../ports/dataaccess/repositories/ward.repository.port';
// import { BankDetailRepositoryPort } from '../../ports/dataaccess/repositories/bank-detail.repository.port';
// import { AddressRepositoryPort } from '../../ports/dataaccess/repositories/address.repository.port';

// import { TaxPayerStatus } from 'src/user/core/domain/value-objects/tax-payer-status';
// import { TaxPayerRegisteredEvent } from 'src/user/core/domain/events/tax-payer-registered.event';
// import { JwtService } from '@nestjs/jwt';
// import { HashPasswordService } from '../../../domain/services/hash-password.service';

@CommandHandler(RegisterTaxPayerCommand)
export class RegisterTaxPayerCommandHandler
  implements ICommandHandler<RegisterTaxPayerCommand>
{
  constructor(
    private readonly HashPasswordService: HashPasswordService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly TaxOfficeRepository: TaxOfficeRepositoryPort,
    private readonly BankRepository: BankRepositoryPort,
    private readonly WardRepository: WardRepositoryPort,
    private readonly BankDetailRepository: BankDetailRepositoryPort,
    private readonly AddressRepository: AddressRepositoryPort,
  ) {}

  private readonly logger = new Logger(RegisterTaxPayerCommandHandler.name);

  public async execute(payload: RegisterTaxPayerCommand) {
    try {
      this.logger.log(`> : ${JSON.stringify(payload)}`);

      const newAddress = Address.Builder(new AddressId(randomUUID()))
        .withWardId(new WardId(payload.wardId))
        .withNoteAddress(payload.noteAddress)
        .build();

      const newBankDetail = BankDetail.Builder(new BankDetailId(randomUUID()))
        .withBankId(new BankId(payload.bankId))
        .withAccountBank(payload.accountBank)
        .build();

      const hashPassword = await this.HashPasswordService.hash(
        payload.password,
      );

      const newTaxPayer = TaxPayer.Builder(new TaxCode(randomUUID()))
        .withName(payload.name)
        .withPassword(hashPassword)
        .withEmail(new Email(payload.email))
        .withPhoneNumber(new PhoneNumber(payload.phoneNumber))
        .withTaxOfficeId(new TaxOfficeId(payload.taxOfficeId))
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