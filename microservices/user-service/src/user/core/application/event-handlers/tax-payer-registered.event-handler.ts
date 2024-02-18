import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaxPayerRegisteredEvent } from '../../domain/events/tax-payer-registered.event';
import { Mailer } from '../ports/mailer/actions/mailer.action';

@EventsHandler(TaxPayerRegisteredEvent)
export class TaxPayerRegisteredEventHandler
  implements IEventHandler<TaxPayerRegisteredEvent>
{
  private readonly logger = new Logger(TaxPayerRegisteredEventHandler.name);

  constructor(
    // private readonly eventBus: EventBus,
    private readonly Mailer: Mailer,
  ) {}
  handle(TaxPayerRegisteredEvent: TaxPayerRegisteredEvent) {
    this.logger.debug(
      `> TaxPayerRegisteredEvent: ${JSON.stringify(TaxPayerRegisteredEvent)}`,
    );



    this.Mailer.send(
      TaxPayerRegisteredEvent.TaxPayer.email,
        'Xác thực email',
        `<h1>Hi ${TaxPayerRegisteredEvent.TaxPayer.name},</h1>`,
    );

    this.logger.log(
      `> Gửi xác thực email: ${JSON.stringify(TaxPayerRegisteredEvent.TaxPayer.email.value)}`,
    );



    
    // queue
  }
}
