import { IMailer } from '@vuvannghia/common';
import { Email } from 'src/user/core/domain/value-objects/email';

export abstract class MailerPort implements IMailer {
  abstract send(receiver: Email, title: string, htmlContent: string);
}
