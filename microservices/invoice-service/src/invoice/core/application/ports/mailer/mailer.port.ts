import { IMailer } from '../../../../../common/ddd/oop/core/application/ports/mailer/i-mailer';
import { Email } from '../../../domain/value-objects/email';

export abstract class MailerPort implements IMailer {
  abstract send(receiver: Email, title: string, htmlContent: string);
}
