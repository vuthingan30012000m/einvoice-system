import { BaseValueObject } from "../../../../common/ddd/oop/core/domain/value-objects/domain.value-object";

export class AddressId extends BaseValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
