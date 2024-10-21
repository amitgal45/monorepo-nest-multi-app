import { EmailProviderType } from '../constants';
import { IEmailProvider } from '../interfaces';
import { MailgunProvider, SendGridProvider } from '../providers';

export class EmailProviderFactory {
  static create(
    provider: string,
    apiKey: string,
    fromEmail: string,
  ): IEmailProvider {
    switch (provider) {
      case EmailProviderType.SENDGRID:
        return new SendGridProvider(apiKey, fromEmail);
      case EmailProviderType.MAILGUN:
        return new MailgunProvider(apiKey, fromEmail);
      default:
        throw new Error(`Unsupported email provider: ${provider}`);
    }
  }
}
