import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaxPayerRegisteredEvent } from '../../domain/events/tax-payer-registered.event';
import { MailerPort } from '../ports/mailer/mailer.port';
import { MessageQueuePort } from '../ports/publisher/message-queue.port';
import { EncryptionEmailService } from '../../domain/services/encryption-email.service';

@EventsHandler(TaxPayerRegisteredEvent)
export class TaxPayerRegisteredEventHandler
  implements IEventHandler<TaxPayerRegisteredEvent>
{
  private readonly logger = new Logger(TaxPayerRegisteredEventHandler.name);

  constructor(
    private readonly EncryptionEmailService: EncryptionEmailService,
    private readonly mailerPort: MailerPort,
    private readonly MessageQueuePort: MessageQueuePort,
  ) {}

  handle(event: TaxPayerRegisteredEvent) {
    try {
      this.logger.debug(`> Event: ${JSON.stringify(event)}`);

      const tokenEmail = this.EncryptionEmailService.encrypt(
        event.newTaxPayer.email.value,
        process.env.VERIFY_EMAIL_SECRET,
      );

      this.mailerPort.send(
        event.newTaxPayer.email,
        'Xác thực email',
        `
      <h1>Xin chào <strong>${event.newTaxPayer.name}</strong>,</h1>

      <p>
      Cảm ơn bạn đã đăng ký. Mã số thuế của bạn là: <strong>${event.newTaxPayer.taxCode.value}</strong>
      </p>

      <br />

      <p>
      Để hoàn tất quá trình đăng ký, bạn cần xác nhận địa chỉ email của mình.
      Vui lòng nhấn vào nút bên dưới để xác nhận địa chỉ email của bạn.
      </p>

      <a style=" background-color: #04aa6d;
      color: white;
      padding: 10px;
      text-decoration: none;
      border-radius: 12px; "
      href="${process.env.APP_DOMAIN}:${process.env.APP_PORT}/api/user/verify-email/${tokenEmail}" target="_blank" >
      &#128073; Xác thực email</a >

      <br />
      <p>Trân trọng,</p>
      <p><strong> Vũ Văn Nghĩa </strong></p>
      <p><strong> MSSV: 20206205 </strong></p>
      `,
      );

      this.logger.log(
        `> Gửi email: ${JSON.stringify(event.newTaxPayer.email.value)}`,
      );

      this.MessageQueuePort.sendMessage('tax-payer-registered', event);
      this.logger.log(`> Gửi sự kiện: ${JSON.stringify(event)}`);
    } catch (error) {
      return { message: error.message };
    }
  }
}
