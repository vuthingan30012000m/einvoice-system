import { DomainValueObject } from '@vuvannghia/common';

export class BuyerId extends DomainValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
