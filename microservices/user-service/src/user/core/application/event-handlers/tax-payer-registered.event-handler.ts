import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaxPayerRegisteredEvent } from '../../domain/events/tax-payer-registered.event';
import { MailerPort } from '../ports/mailer/mailer.port';
import { QueuePort } from '../ports/queue/queue.port';
import { EncryptionEmailService } from '../../domain/services/encryption-email.service';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(TaxPayerRegisteredEvent)
export class TaxPayerRegisteredEventHandler
  implements IEventHandler<TaxPayerRegisteredEvent>
{
  private readonly logger = new Logger(TaxPayerRegisteredEventHandler.name);

  constructor(
    private readonly EncryptionEmailService: EncryptionEmailService,
    private readonly mailerPort: MailerPort,
    private readonly QueuePort: QueuePort,
  ) {}

  handle(TaxPayerRegisteredEvent: TaxPayerRegisteredEvent) {
    try {
      this.logger.debug(
        `> TaxPayerRegisteredEvent: ${JSON.stringify(TaxPayerRegisteredEvent)}`,
      );

      const tokenEmail = this.EncryptionEmailService.encrypt(
        TaxPayerRegisteredEvent.TaxPayer.email.value,
        process.env.VERIFY_EMAIL_SECRET,
      );

      this.mailerPort.send(
        TaxPayerRegisteredEvent.TaxPayer.email,
        'Xác thực email',
        `
<h1>Xin chào <strong>${TaxPayerRegisteredEvent.TaxPayer.name}</strong>,</h1>

<p>
Cảm ơn bạn đã đăng ký. Mã số thuế của bạn là: <strong>${TaxPayerRegisteredEvent.TaxPayer.id.value}</strong>
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
        `> Gửi xác thực email: ${JSON.stringify(TaxPayerRegisteredEvent.TaxPayer.email.value)}`,
      );

      // queue
    } catch (error) {
      return { message: error.message };
    }
  }
}
