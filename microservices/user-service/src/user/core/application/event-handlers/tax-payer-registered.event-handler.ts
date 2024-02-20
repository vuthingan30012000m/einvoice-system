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
        event.TaxPayer.email.value,
        process.env.VERIFY_EMAIL_SECRET,
      );

      // this.mailerPort.send(
      // event.TaxPayer.email,
      // 'Xác thực email',
      // `
      // <h1>Xin chào <strong>${event.TaxPayer.name}</strong>,</h1>

      // <p>
      // Cảm ơn bạn đã đăng ký. Mã số thuế của bạn là: <strong>${event.TaxPayer.id.value}</strong>
      // </p>

      // <br />

      // <p>
      // Để hoàn tất quá trình đăng ký, bạn cần xác nhận địa chỉ email của mình.
      // Vui lòng nhấn vào nút bên dưới để xác nhận địa chỉ email của bạn.
      // </p>

      // <a style=" background-color: #04aa6d;
      // color: white;
      // padding: 10px;
      // text-decoration: none;
      // border-radius: 12px; "
      // href="${process.env.APP_DOMAIN}:${process.env.APP_PORT}/api/user/verify-email/${tokenEmail}" target="_blank" >
      // &#128073; Xác thực email</a >

      // <br />
      // <p>Trân trọng,</p>
      // <p><strong> Vũ Văn Nghĩa </strong></p>
      // <p><strong> MSSV: 20206205 </strong></p>
      // `,
      // );

      this.logger.log(
        `> Gửi email: ${JSON.stringify(event.TaxPayer.email.value)}`,
      );

      this.MessageQueuePort.sendMessage('tax-payer-registered', event.TaxPayer);
      this.logger.log(`> Gửi sự kiện: ${JSON.stringify(event.TaxPayer)}`);

      // id
      console.log('🚀 ~ handle ~ event.TaxPayer:', event.TaxPayer.id.value);
      //   "name": "Johnathan Schmeler",
      console.log('🚀 ~ handle ~ event.TaxPayer:', event.TaxPayer.name);
      //   "email"
      console.log('🚀 ~ handle ~ event.TaxPayer:', event.TaxPayer.email.value);

      //   "phoneNumber": "220-278-5325 x628",
      //   "taxOfficeId": "1054029",
      //   "bankId": "1",
      //   "accountBank": "35447705",
      //   "wardId": "00277",
      //   "noteAddress": "92780 Gloria Oval"
      // }
      // @
      // @
      // @
      // @
      // "email":{"value":"Dolly89@yahoo.com"},"phoneNumber":{"value":"220-278-5325 x628"},"taxOfficeId":{"value":"1054029"},"bankDetailId":{"value":"0232643c-fcb3-420c-8b49-c0d57fdbe6de"},"addressId":{"value":"e0f2c669-6ba9-41e2-a036-d577fa95b9a0"},"taxPayerStatus":"VERIFY_EMAIL"}
      // invoice-1      | 🚀 ~ TaxPayerRegisteredEvent ~ RegisterTaxPayerDto: {
      // invoice-1      |   _id: { value: 'efa30b76-ecae-4f98-a971-5f41dd34cb17' },
      // invoice-1      |   name: 'Johnathan Schmeler',
      // invoice-1      |   password: 'ea584772e7afd15ccbf0bd94f8d27ceaa82aca504ad7359a14730be0120ef9b27047531c1c870bea916b702c0da0869dcd676ff5754e7ba6b8cbe63ad5eb2c81.40b24a7a7ef9e27e',
      // invoice-1      |   email: { value: 'Dolly89@yahoo.com' },
      // invoice-1      |   phoneNumber: { value: '220-278-5325 x628' },
      // invoice-1      |   taxOfficeId: { value: '1054029' },
      // invoice-1      |   bankDetailId: { value: '0232643c-fcb3-420c-8b49-c0d57fdbe6de' },
      // invoice-1      |   addressId: { value: 'e0f2c669-6ba9-41e2-a036-d577fa95b9a0' },
      // invoice-1      |   taxPayerStatus: 'VERIFY_EMAIL'
      // invoice-1      | }
    } catch (error) {
      return { message: error.message };
    }
    console.log('🚀 ~ handle ~ event.TaxPayer:', event.TaxPayer);
  }
}
