import { DomainEntity } from '../../../../common/ddd/oop/core/domain/entities/domain.entity';

import { TaxOfficeId } from '../value-objects/tax-office-id';

export class TaxOffice extends DomainEntity<TaxOfficeId> {
  name: string;

  constructor(taxOfficeId: TaxOfficeId) {
    super(taxOfficeId);
  }
}
