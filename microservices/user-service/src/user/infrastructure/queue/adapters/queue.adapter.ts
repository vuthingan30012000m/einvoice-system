import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessageQueuePort } from 'src/user/core/application/ports/publisher/message-queue.port';

@Injectable()
export abstract class QueueAdapter implements MessageQueuePort {
  constructor(
    @Inject('MESSAGE_QUEUE_EVENT') private natsMessageQueue: ClientProxy,
  ) {}

  sendMessage(pattern: string, data: any) {
    return this.natsMessageQueue.emit(pattern, data);
  }
}