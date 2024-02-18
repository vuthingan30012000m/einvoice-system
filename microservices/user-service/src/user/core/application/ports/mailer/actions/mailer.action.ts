import { IMailer } from 'src/common/ddd/oop/core/application/ports/mailer/i-mailer';

export abstract class Mailer implements IMailer {
  abstract send(data: any): Promise<any>;
}
