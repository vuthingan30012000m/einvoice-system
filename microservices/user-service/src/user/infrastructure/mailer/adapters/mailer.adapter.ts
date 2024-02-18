import { Mailer } from 'src/user/core/application/ports/mailer/actions/mailer.action';
import { MailerService } from '@nestjs-modules/mailer';
import { Email } from 'src/user/core/domain/value-objects/email';

import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MailerAdapter implements Mailer {
  constructor(private readonly mailerService: MailerService) {}

  async send(receiver: Email, title: string, htmlContent: string) {
    await this.mailerService.sendMail({
      to: receiver.value,
      subject: title,
      html: htmlContent,
    });
  }
}
