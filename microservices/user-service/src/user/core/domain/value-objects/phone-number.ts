import { BaseValueObject } from "../../../../common/ddd/oop/core/domain/value-objects/domain.value-object";
import { TaxPayerException } from '../exceptions/tax-payer.exception';

export class PhoneNumber extends BaseValueObject {
  constructor(readonly value: string) {
    super(value);
    this.validate();
  }

  validate() {
    const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (!regex.test(this.value)) {
      throw new TaxPayerException('Số điện thoại không đúng định dạng.');
    }
  }
}
