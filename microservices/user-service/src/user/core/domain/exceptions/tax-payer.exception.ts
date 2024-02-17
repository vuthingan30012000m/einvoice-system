import { DomainException } from '../../../../common/core/domain/exceptions/domain.exception';

export class TaxPayerException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
