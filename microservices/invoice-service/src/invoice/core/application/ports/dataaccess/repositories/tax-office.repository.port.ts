import { IRepository } from '@vuvannghia/common';
import { TaxOffice } from 'src/invoice/core/domain/entities/tax-office';
import { TaxOfficeId } from 'src/invoice/core/domain/value-objects/tax-office-id';

export abstract class TaxOfficeRepositoryPort
  implements IRepository<TaxOffice>
{
  abstract save(entity: TaxOffice | TaxOffice[]): Promise<TaxOffice>;
  abstract getAll(): Promise<TaxOffice[]>;
  abstract getOneById(id: TaxOfficeId): Promise<TaxOffice>;
  abstract delete(entity: TaxOffice): Promise<boolean>;
}