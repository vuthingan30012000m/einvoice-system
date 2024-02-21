import { IMailer } from '@vuvannghia/common';
import { Email } from '@vuvannghia/common';

export abstract class MailerPort implements IMailer {
  abstract send(receiver: Email, title: string, htmlContent: string);
}
