import { DomainException } from '../../../../common/ddd/oop/core/domain/exceptions/domain.exception';

export class TaxPayerException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
