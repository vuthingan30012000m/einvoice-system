export interface IMailer {
  send(receiver: any, title: any, htmlContent: any): Promise<any>;
}
