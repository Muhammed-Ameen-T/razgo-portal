import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'inversify';
import { env } from '../../config/env.config';
import { IEmailService } from '../../domain/interfaces/services/IEmailService';

@injectable()
export class NodemailerService implements IEmailService {
  private _transporter: Transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      socketTimeout: 10000,
    });
  }

  async sendEmail(recipient: string, subject: string, htmlContent: string): Promise<void> {
    try {
      await this._transporter.sendMail({
        from: env.SMTP_USERNAME,
        to: recipient,
        subject,
        html: htmlContent,
      });
      console.log(`✅ Email sent to ${recipient}: ${subject}`);
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }
}
