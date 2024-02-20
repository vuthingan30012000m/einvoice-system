import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NatsClientModule } from '../common/api/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
