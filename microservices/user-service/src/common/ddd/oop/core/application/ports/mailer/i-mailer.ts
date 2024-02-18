export interface IMailer {
  send(data: any): Promise<any>;
}
