import { DomainValueObject } from '@vuvannghia/common';

export class AddressId extends DomainValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
