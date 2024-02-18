import { MailerPort } from '../../../core/application/ports/mailer/mailer.port';
import { MailerService } from '@nestjs-modules/mailer';
import { Email } from 'src/user/core/domain/value-objects/email';

import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MailerAdapter implements MailerPort {
  constructor(private readonly mailerService: MailerService) {}

  async send(receiver: Email, title: string, htmlContent: string) {
    await this.mailerService.sendMail({
      to: receiver.value,
      subject: title,
      html: htmlContent,
    });
  }
}
