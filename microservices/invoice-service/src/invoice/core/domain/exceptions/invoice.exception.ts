import { DomainException } from '../../../../common/core/domain/exceptions/domain.exception';

export class InvoiceException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
