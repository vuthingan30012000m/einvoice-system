import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaxPayerRegisteredEvent } from '../../domain/events/tax-payer-registered.event';
import { MailerService } from '@nestjs-modules/mailer';

@EventsHandler(TaxPayerRegisteredEvent)
export class TaxPayerRegisteredEventHandler
  implements IEventHandler<TaxPayerRegisteredEvent>
{
  private readonly logger = new Logger(TaxPayerRegisteredEventHandler.name);

  constructor(private readonly MailerService: MailerService) {}
  handle(TaxPayerRegisteredEvent: TaxPayerRegisteredEvent) {
    this.logger.debug(
      `> TaxPayerRegisteredEvent:   ${JSON.stringify(TaxPayerRegisteredEvent)}`,
    );
    // queue
    // send email
    this.MailerService.sendMail({
      to: TaxPayerRegisteredEvent.TaxPayer.email.value,
      subject: 'Xác thực email',
      html: `<h1>Hi ${TaxPayerRegisteredEvent.TaxPayer.name},</h1>`,
    });
    this.logger.log(
      `> Send email:   ${JSON.stringify(TaxPayerRegisteredEvent.TaxPayer.email.value)}`,
    );
  }
}
