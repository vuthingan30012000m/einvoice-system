import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaxPayerDeletedEventCommand } from './tax-payer-deleted-event.command';
import { TaxCode } from '../../../domain/value-objects/tax-code';

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { TaxOfficeRepositoryPort } from '../../ports/dataaccess/repositories/tax-office.repository.port';
import { BankRepositoryPort } from '../../ports/dataaccess/repositories/bank.repository.port';
import { WardRepositoryPort } from '../../ports/dataaccess/repositories/ward.repository.port';
import { BankDetailRepositoryPort } from '../../ports/dataaccess/repositories/bank-detail.repository.port';
import { AddressRepositoryPort } from '../../ports/dataaccess/repositories/address.repository.port';

@CommandHandler(TaxPayerDeletedEventCommand)
export class TaxPayerDeletedEventCommandHandler
  implements ICommandHandler<TaxPayerDeletedEventCommand>
{
  constructor(private readonly TaxPayerRepository: TaxPayerRepositoryPort) {}
  private readonly logger = new Logger(TaxPayerDeletedEventCommandHandler.name);

  public async execute(payload: TaxPayerDeletedEventCommand) {
    try {
      this.logger.log(`> payload: ${JSON.stringify(payload)}`);

      const findTaxPayer = await this.TaxPayerRepository.getOneById(
        payload.taxCode,
      );

      findTaxPayer.delete();

      await this.TaxPayerRepository.save(findTaxPayer);
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
