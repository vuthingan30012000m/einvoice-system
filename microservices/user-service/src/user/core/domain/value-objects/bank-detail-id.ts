import { DomainValueObject } from '../../../../common/ddd/oop/core/domain/value-objects/domain.value-object';

export class BankDetailId extends DomainValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
