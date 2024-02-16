import { TaxPayerException } from '../exceptions/tax-payer.exception';

export class PhoneNumber {
  constructor(readonly value: string) {
    this.validate();
  }

  validate() {
    const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!regex.test(this.value)) {
      throw new TaxPayerException('Số điện thoại không đúng định dạng.');
    }
  }
}
