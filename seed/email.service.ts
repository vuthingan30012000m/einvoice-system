import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail1() {
    await this.mailerService.sendMail({
      from: process.env.EMAIL_USER,
      // to: 'nghia.vv2026205@sis.hust.edu.vn',
        to: process.env.EMAIL_USER,
      // to: process.env.EMAIL_USER,
      subject: '(Tổng cục thuế Demo) 1111111111111111111',
      template: 'email1',
      context: {
        TenNguoiNopThue: 'Vũ Văn Nghĩa',
        MaSoThue: '8693324674',
        bien1: 'Giá trị biến bien1',
      },
    });
  }
  async sendEmail2() {
    await this.mailerService.sendMail({
      from: process.env.EMAIL_USER,
      // to: 'nghia.vv2026205@sis.hust.edu.vn',
        to: process.env.EMAIL_USER,
      // to: process.env.EMAIL_USER,
      subject: '(Tổng cục thuế Demo) sendEmail2',
      template: 'email2',
      context: {
        TenNguoiNopThue: 'Vũ Văn Nghĩa',
        MaSoThue: '8693324674',
        bien21: 'Giá trị biến bien21',
        bien22: 'Giá trị biến bien22',
      },
    });
  }
  async testSendEmail() {
    await this.sendEmail1();
    await this.sendEmail2();
  }
}
