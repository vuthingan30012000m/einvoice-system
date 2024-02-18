import { IRepository } from 'src/common/ddd/oop/core/application/ports/dataaccess/repositories/i-repository';
import { TaxOffice } from 'src/user/core/domain/entities/tax-office';
import { TaxOfficeId } from 'src/user/core/domain/value-objects/tax-office-id';

export abstract class TaxOfficeRepositoryPort implements IRepository<TaxOffice> {
  abstract save(entity: TaxOffice | TaxOffice[]): Promise<TaxOffice>;
  abstract getAll(): Promise<TaxOffice[]>;
  abstract getOneById(id: TaxOfficeId): Promise<TaxOffice>;
  abstract delete(entity: TaxOffice): Promise<boolean>;
}
