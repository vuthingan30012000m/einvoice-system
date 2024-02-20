import { EventPattern, Payload } from '@nestjs/microservices';

export class ListenerEvent {
  @EventPattern('tax-payer-registered')
  async TaxPayerRegisteredEvent(@Payload() data: any) {
    console.log(data);
  }
}
