import { BaseValueObject } from "../../../../common/ddd/oop/core/domain/value-objects/domain.value-object";

export class DistrictId extends BaseValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
