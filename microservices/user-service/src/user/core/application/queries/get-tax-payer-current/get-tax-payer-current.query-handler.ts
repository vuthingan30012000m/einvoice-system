import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTaxPayerCurrentQuery } from './get-tax-payer-current.query';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { Logger } from '@nestjs/common';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { TaxPayerException } from 'src/user/core/domain/exceptions/tax-payer.exception';

@QueryHandler(GetTaxPayerCurrentQuery)
export class GetTaxPayerCurrentQueryHandler
  implements IQueryHandler<GetTaxPayerCurrentQuery>
{
  private readonly logger = new Logger(GetTaxPayerCurrentQueryHandler.name);
  
  
  
  
  
  
  constructor(private readonly TaxPayerRepository: TaxPayerRepositoryPort) {}

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

      const { password, usbToken, ...result } = existingTaxPayer;
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}
