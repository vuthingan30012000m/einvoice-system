import { ClientsModule, Transport } from '@nestjs/microservices';

export class QueueConfig {
  static configs() {
    return ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVICE],
        },
      },
    ]);
  }
}
