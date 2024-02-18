import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaxPayerRegisteredEvent } from '../../domain/events/tax-payer-registered.event';
import { Mailer } from '../ports/mailer/actions/mailer.action';

@EventsHandler(TaxPayerRegisteredEvent)
export class TaxPayerRegisteredEventHandler
  implements IEventHandler<TaxPayerRegisteredEvent>
{
  private readonly logger = new Logger(TaxPayerRegisteredEventHandler.name);

  constructor(
    // private readonly kafka: kafka,
    private readonly Mailer: Mailer,
  ) {}
  handle(TaxPayerRegisteredEvent: TaxPayerRegisteredEvent) {
    this.logger.debug(
      `> TaxPayerRegisteredEvent: ${JSON.stringify(TaxPayerRegisteredEvent)}`,
    );



    this.Mailer.send(
      TaxPayerRegisteredEvent.TaxPayer.email,
        'Xác thực email',
        `<h1>Xin chào <strong>${TaxPayerRegisteredEvent.TaxPayer.name}</strong>,</h1>
<p>
Cảm ơn bạn đã đăng ký. 
Để hoàn tất quá trình đăng ký, bạn cần xác nhận địa chỉ email của mình. 
Vui lòng nhấn vào nút bên dưới để xác nhận địa chỉ email của bạn.
</p>

<a
  style="     background-color: #04aa6d;
    color: white;
    padding: 10px;
    text-decoration: none;
    border-radius: 12px;  "
  href="app"   target="_blank" >
  &#128073; Xác thực email</a >





  ${process.env['APP_NAME']}
  ${process.env['APP_PORT']}
  ${process.env['APP_DOMAIN']}



  <br />
<p>Trân trọng,</p>
<p><strong> Vũ Văn Nghĩa </strong></p>
<p><strong> MSSV: 20206205 </strong></p>`,    );

    this.logger.log(
      `> Gửi xác thực email: ${JSON.stringify(TaxPayerRegisteredEvent.TaxPayer.email.value)}`,
    );



    
    // queue
  }
}
