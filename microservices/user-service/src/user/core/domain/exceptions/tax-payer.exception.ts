import { DomainException } from '../../../../common/ddd/core/domain/exceptions/domain.exception';

export class TaxPayerException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
