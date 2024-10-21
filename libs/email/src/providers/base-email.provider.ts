import { IEmailProvider } from '../interfaces';

export abstract class BaseEmailProvider implements IEmailProvider {
  constructor(
    protected readonly apiKey: string,
    protected readonly fromEmail: string,
  ) {}

  abstract sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<void>;
}
