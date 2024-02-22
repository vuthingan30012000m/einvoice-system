import { Module } from '@nestjs/common';
import { NatsClientModule } from '../../nats-client/nats-client.module';
import { TctDemoController } from './tct-demo.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [TctDemoController],
  providers: [],
})
export class TctDemoModule {}
