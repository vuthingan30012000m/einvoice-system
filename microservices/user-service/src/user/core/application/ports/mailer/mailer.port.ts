import { IMailer } from 'src/common/ddd/oop/core/application/ports/mailer/i-mailer';
import { Email } from 'src/user/core/domain/value-objects/email';

export abstract class MailerPort implements IMailer {
  abstract send(receiver: Email, title: string, htmlContent: string);
}