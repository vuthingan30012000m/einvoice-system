import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaxPayerRegisteredEvent } from '../../domain/events/tax-payer-registered.event'

@EventsHandler(TaxPayerRegisteredEvent)
export class TaxPayerRegisteredEventHandler
  implements IEventHandler<TaxPayerRegisteredEvent>
{

  private readonly logger = new Logger(TaxPayerRegisteredEventHandler.name);

  handle(TaxPayerRegisteredEvent: TaxPayerRegisteredEvent) {
    this.logger.debug(
      `> TaxPayerRegisteredEvent:   ${JSON.stringify(TaxPayerRegisteredEvent)}`,
    );
    // queue
    // send email
  }
}
