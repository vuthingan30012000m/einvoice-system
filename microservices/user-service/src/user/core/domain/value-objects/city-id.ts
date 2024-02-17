import { BaseValueObject } from "../../../../common/ddd/oop/core/domain/value-objects/base-value-object";

export class CityId extends BaseValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
