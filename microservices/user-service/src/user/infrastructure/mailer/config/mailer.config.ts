import { MailerModule } from "@nestjs-modules/mailer";

export class MailerConfig {
  static init() {
    return     MailerModule.forRoot({
      transport:{
        host:  process.env['MAIL_HOST'],
        port:Number(process.env['MAIL_PORT']),
      }
      ,defaults:{
        from:"no-reply@20206205" 
      }
    }) }
}
