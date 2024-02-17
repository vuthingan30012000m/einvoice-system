import { TaxOfficeEntity } from '../entities/tax-office.entity';
import { TaxOffice } from 'src/user/core/domain/entities/tax-office';

import { TaxOfficeId } from 'src/user/core/domain/value-objects/tax-office-id';

export class TaxOfficeAdapter {
  static toDomain(TaxOfficeEntity: TaxOfficeEntity): TaxOffice {
    const TaxOfficeModel = new TaxOffice(new TaxOfficeId(TaxOfficeEntity.id));
    TaxOfficeModel.name = TaxOfficeEntity.name;
    return TaxOfficeModel;
  }
 
  static toPersistence(TaxOffice: TaxOffice): TaxOfficeEntity {
    const entity = new TaxOfficeEntity();

    entity.id = TaxOffice.id.value;
    entity.name = TaxOffice.name;

    return null;
  }
}
