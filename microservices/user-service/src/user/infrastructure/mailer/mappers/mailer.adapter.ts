import { Mailer } from 'src/user/core/application/ports/mailer/actions/mailer.action';
import { MailerService } from '@nestjs-modules/mailer';

export abstract class MailerAdapter implements Mailer {
  constructor(private readonly MailerService: MailerService) {}
  send(data: any): Promise<any> {
    console.log("🚀 ~ MailerAdapter ~ send ~ data:", data.to)
    return this.MailerService.sendMail(data);
  }
}
// fix bug 
// 🚀 ~ MailerAdapter ~ send ~ data: {
//   to: 'Loraine.Schoen57Schoen57Schoen57Schoen57@gmail.com',
//   subject: 'Xác thực email',
//   html: '<h1>Hi Emma Langworth,</h1>'
// }