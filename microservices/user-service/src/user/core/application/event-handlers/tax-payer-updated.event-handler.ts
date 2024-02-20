import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MailerPort } from '../ports/mailer/mailer.port';
import { EncryptionEmailService } from '../../domain/services/encryption-email.service';
import { TaxPayerUpdatedEvent } from '../../domain/events/tax-payer-updated.event';
import { MessageQueuePort } from '../ports/publisher/message-queue.port';

@EventsHandler(TaxPayerUpdatedEvent)
export class TaxPayerUpdatedEventHandler
  implements IEventHandler<TaxPayerUpdatedEvent>
{
  private readonly logger = new Logger(TaxPayerUpdatedEventHandler.name);

  constructor(
    private readonly EncryptionEmailService: EncryptionEmailService,
    private readonly MessageQueuePort: MessageQueuePort,
  ) {}

  handle(event: TaxPayerUpdatedEvent) {
    try {
      this.logger.debug(`> Event: ${JSON.stringify(event)}`);

      this.MessageQueuePort.sendMessage('tax-payer-updated', event.TaxPayer);
      this.logger.log(`> Gửi     sự kiện: ${JSON.stringify(event.TaxPayer)}`);
    } catch (error) {
      return { message: error.message };
    }
  }
}
