import { DomainException } from '../../../../common/ddd/oop/core/domain/exceptions/domain.exception';

export class InvoiceException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
