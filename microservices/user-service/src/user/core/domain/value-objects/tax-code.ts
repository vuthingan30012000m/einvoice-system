import { BaseValueObject } from '../../../../common/core/domain/value-objects/base-value-object';

export class TaxCode extends BaseValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
