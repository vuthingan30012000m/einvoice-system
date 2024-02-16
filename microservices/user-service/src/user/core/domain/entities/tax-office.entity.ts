import { BaseEntity } from '../../../../common/core/domain/entities/base-entity';

import { TaxOfficeId } from '../value-objects/tax-office-id';

export class TaxOffice extends BaseEntity<TaxOfficeId> {
  name: string;
  constructor(taxOfficeId: TaxOfficeId) {
    super(taxOfficeId);
  }
}
