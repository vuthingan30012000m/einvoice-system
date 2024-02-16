import { TaxPayerException } from '../exceptions/tax-payer.exception';

export class Email {
  constructor(readonly value: string) {
    this.validate();
  }

  validate() {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regex.test(this.value)) {
      throw new TaxPayerException('Email không đúng định dạng.');
    }
  }
}
