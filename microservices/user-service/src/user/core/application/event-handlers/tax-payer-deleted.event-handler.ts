import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailerPort } from '../ports/mailer/mailer.port';
import { EncryptionEmailService } from '../../domain/services/encryption-email.service';
import { TaxPayerDeletedEvent } from '../../domain/events/tax-payer-deleted.event';

@EventsHandler(TaxPayerDeletedEvent)
export class TaxPayerDeletedEventHandler
  implements IEventHandler<TaxPayerDeletedEvent>
{
  private readonly logger = new Logger(TaxPayerDeletedEventHandler.name);

  constructor(
    // private readonly kafka: kafka,
    private readonly EncryptionEmailService: EncryptionEmailService,
    private readonly mailerPort: MailerPort,
  ) {}

  handle(TaxPayerDeletedEvent: TaxPayerDeletedEvent) {
    try {
      this.logger.debug(
        `> TaxPayerDeletedEvent: ${JSON.stringify(TaxPayerDeletedEvent)}`,
      );

      // queue
    } catch (error) {
      return { message: error.message };
    }
  }
}
