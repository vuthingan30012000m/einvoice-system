import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QueuePort } from 'src/user/core/application/ports/queue/queue.port';

@Injectable()
export abstract class QueueAdapter implements QueuePort {
  constructor(@Inject('MESSAGE_QUEUE_EVENT') private natsClient: ClientProxy) {}

  async send() {
    return this.natsClient.send({ cmd: 'register' }, {});
  }
  // constructor(private readonly QueueService: QueueService) {}
  // async send(receiver: Email, title: string, htmlContent: string) {
  // await this.QueueService.sendMail({
  // to: receiver.value,
  // subject: title,
  // html: htmlContent,
  // });
  // }
}
