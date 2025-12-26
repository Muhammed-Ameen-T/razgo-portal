export interface IEmailService {
  sendEmail(recipient: string, subject: string, htmlContent: string): Promise<void>;
}
