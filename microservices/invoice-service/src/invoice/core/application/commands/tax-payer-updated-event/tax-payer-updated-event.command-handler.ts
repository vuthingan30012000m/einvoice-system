import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaxPayerUpdatedEventCommand } from './tax-payer-updated-event.command';

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { TaxOfficeRepositoryPort } from '../../ports/dataaccess/repositories/tax-office.repository.port';
import { BankRepositoryPort } from '../../ports/dataaccess/repositories/bank.repository.port';
import { WardRepositoryPort } from '../../ports/dataaccess/repositories/ward.repository.port';
import { BankDetailRepositoryPort } from '../../ports/dataaccess/repositories/bank-detail.repository.port';
import { AddressRepositoryPort } from '../../ports/dataaccess/repositories/address.repository.port';
import { TaxCode } from '../../../domain/value-objects/tax-code';
import { Email } from '../../../domain/value-objects/email';
import { PhoneNumber } from '../../../domain/value-objects/phone-number';

@CommandHandler(TaxPayerUpdatedEventCommand)
export class TaxPayerUpdatedEventCommandHandler
  implements ICommandHandler<TaxPayerUpdatedEventCommand>
{
  constructor(
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly TaxOfficeRepositoryPort: TaxOfficeRepositoryPort,
    private readonly BankRepository: BankRepositoryPort,
    private readonly WardRepository: WardRepositoryPort,
    private readonly BankDetailRepository: BankDetailRepositoryPort,
    private readonly AddressRepository: AddressRepositoryPort,
  ) {}
  private readonly logger = new Logger(TaxPayerUpdatedEventCommandHandler.name);

  public async execute(payload: TaxPayerUpdatedEventCommand) {
    try {
      this.logger.log(`> payload: ${JSON.stringify(payload)}`);
      const findTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.TaxPayer.taxCode.value),
      );
      if (!findTaxPayer) {
        throw new Error('Người nộp thuế không tồn tại.');
      }

      findTaxPayer.update(
        payload.TaxPayer.name,
        new Email(payload.TaxPayer.email.value),
        new PhoneNumber(payload.TaxPayer.phoneNumber.value),
      );

      await this.TaxPayerRepository.save(findTaxPayer);
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
