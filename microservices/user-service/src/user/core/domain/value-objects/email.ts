import { TaxPayerException } from '../exceptions/tax-payer.exception';

export class Email {
  constructor(readonly value: string) {
    this.validate();
  }

  validate() {
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(this.value)) {
      throw new TaxPayerException(
        'Tên chỉ có thể chứa chữ cái, số và khoảng trắng.',
      );
    }
  }
}
