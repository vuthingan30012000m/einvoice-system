import { DomainValueObject } from '../../../../common/ddd/oop/core/domain/value-objects/domain.value-object';

import { InvoiceException } from '../exceptions/invoice.exception';

export class Email extends DomainValueObject {
  constructor(readonly value: string) {
    super(value);
    this.validate();
  }

  validate() {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!regex.test(this.value)) {
      throw new InvoiceException('Email không đúng định dạng.');
    }
  }
}
