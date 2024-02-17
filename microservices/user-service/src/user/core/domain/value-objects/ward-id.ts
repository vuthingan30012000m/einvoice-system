import { DomainValueObject } from "../../../../common/ddd/oop/core/domain/value-objects/domain.value-object";

export class WardId extends DomainValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}
