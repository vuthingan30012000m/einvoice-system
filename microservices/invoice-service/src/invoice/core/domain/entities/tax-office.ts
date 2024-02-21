import { DomainEntity } from '@vuvannghia/common';

import { TaxOfficeId } from '../value-objects/tax-office-id';

export class TaxOffice extends DomainEntity<TaxOfficeId> {
  name: string;

  constructor(taxOfficeId: TaxOfficeId) {
    super(taxOfficeId);
  }
}