import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { BaseEmailProvider } from './base-email.provider';

@Injectable()
export class SendGridProvider extends BaseEmailProvider {
  constructor(apiKey: string, fromEmail: string) {
    super(apiKey, fromEmail);
    SendGrid.setApiKey(this.apiKey);
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    if (!to) {
      throw new Error('Recipient email address is required');
    }

    try {
      const msg = {
        to: to.trim(),
        from: this.fromEmail,
        subject: subject?.trim() || 'No Subject',
        html: content || '',
      };
      await SendGrid.send(msg);
    } catch (error) {
      throw new Error(`SendGrid error: ${error.message}`);
    }
  }
}
