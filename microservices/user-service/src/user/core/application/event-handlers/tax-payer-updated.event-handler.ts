import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailerPort } from '../ports/mailer/mailer.port';
import { EncryptionEmailService } from '../../domain/services/encryption-email.service';
import { TaxPayerUpdatedEvent } from '../../domain/events/tax-payer-updated.event';

@EventsHandler(TaxPayerUpdatedEvent)
export class TaxPayerUpdatedEventHandler
  implements IEventHandler<TaxPayerUpdatedEvent>
{
  private readonly logger = new Logger(TaxPayerUpdatedEventHandler.name);

  constructor(
    // private readonly kafka: kafka,
    private readonly EncryptionEmailService: EncryptionEmailService,
    private readonly mailerPort: MailerPort,
  ) {}

  handle(TaxPayerUpdatedEvent: TaxPayerUpdatedEvent) {
    try {
      this.logger.debug(
        `> TaxPayerUpdatedEvent: ${JSON.stringify(TaxPayerUpdatedEvent)}`,
      );

      // queue
    } catch (error) {
      return { message: error.message };
    }
  }
}
