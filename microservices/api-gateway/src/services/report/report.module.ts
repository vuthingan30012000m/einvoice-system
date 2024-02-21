import { Module } from '@nestjs/common';
import { NatsClientModule } from '../../nats-client/nats-client.module';
import { ReportController } from './report.controller';

@Module({
  controllers: [ReportController],
  providers: [],
})
export class ReportModule {}
