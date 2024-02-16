import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';

import { TaxOfficeId } from '../value-objects/temp/tax-office-id';

export class TaxOffice extends BaseEntity<TaxOfficeId> {
  nameTaxOffice: string;

  constructor(taxOfficeId: TaxOfficeId) {
    super(taxOfficeId);
  }
}
