import { Injectable } from '@nestjs/common';
import { BaseEmailProvider } from './base-email.provider';
import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';

@Injectable()
export class MailgunProvider extends BaseEmailProvider {
  private mailgun: IMailgunClient;

  constructor(apiKey: string, fromEmail: string) {
    super(apiKey, fromEmail);
    const mailgun = new Mailgun(FormData);
    this.mailgun = mailgun.client({
      username: 'api',
      key: this.apiKey,
    });
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const msg = {
      to,
      from: this.fromEmail,
      subject,
      html: content,
    };
    console.log('Sending email via Mailgun:', msg);
  }
}
