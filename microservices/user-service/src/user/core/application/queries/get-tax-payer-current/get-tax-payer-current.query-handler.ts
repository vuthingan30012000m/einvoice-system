import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTaxPayerCurrentQuery } from './get-tax-payer-current.query';
import { Logger } from '@nestjs/common';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';

import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { TaxOfficeRepositoryPort } from '../../ports/dataaccess/repositories/tax-office.repository.port';
import { BankRepositoryPort } from '../../ports/dataaccess/repositories/bank.repository.port';
import { WardRepositoryPort } from '../../ports/dataaccess/repositories/ward.repository.port';
import { BankDetailRepositoryPort } from '../../ports/dataaccess/repositories/bank-detail.repository.port';
import { AddressRepositoryPort } from '../../ports/dataaccess/repositories/address.repository.port';

@QueryHandler(GetTaxPayerCurrentQuery)
export class GetTaxPayerCurrentQueryHandler
  implements IQueryHandler<GetTaxPayerCurrentQuery>
{
  private readonly logger = new Logger(GetTaxPayerCurrentQueryHandler.name);

  constructor(
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,

    private readonly BankRepository: BankRepositoryPort,
    private readonly WardRepository: WardRepositoryPort,
    private readonly BankDetailRepository: BankDetailRepositoryPort,
    private readonly AddressRepository: AddressRepositoryPort,
    private readonly TaxOfficeRepositoryPort: TaxOfficeRepositoryPort,
  ) {}

  public async execute(payload: GetTaxPayerCurrentQuery) {
    try {
      this.logger.debug(
        `> GetTaxPayerCurrentQuery: ${JSON.stringify(payload)}`,
      );

      const existingTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.taxCode),
      );
      console.log('🚀 ~ execute ~ existingTaxPayer:', existingTaxPayer);
      if (!existingTaxPayer) {
        throw new TaxPayerException('Không tìm thấy thông tin người nộp thuế.');
      }

      const existingTaxOffice = await this.TaxOfficeRepositoryPort.getOneById(
        existingTaxPayer.taxOfficeId,
      );
      console.log('🚀 ~ execute ~ existingTaxOffice:', existingTaxOffice);

      const existingBank = await this.BankDetailRepository.getOneById(
        existingTaxPayer.bankDetailId,
      );
      console.log('🚀 ~ execute ~ existingBank:', existingBank);

      const existingAddress = await this.AddressRepository.getOneById(
        existingTaxPayer.addressId,
      );
      console.log('🚀 ~ execute ~ existingAddress:', existingAddress);

      const { password, usbToken, ...result } = existingTaxPayer;
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}
