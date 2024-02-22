import { DomainValueObject } from '@vuvannghia/common';

export class SellerId extends DomainValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
