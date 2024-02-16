import { BaseValueObject } from '../../../../common/core/domain/value-objects/base-value-object';

export class AddressId extends BaseValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
