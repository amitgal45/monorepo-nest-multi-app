export interface IEmailProvider {
  sendEmail(to: string, subject: string, content: string): Promise<void>;
}

// Optional extended version with additional methods:
export interface IAdvancedEmailProvider extends IEmailProvider {
  sendEmailWithAttachment(
    to: string,
    subject: string,
    content: string,
    attachments: EmailAttachment[],
  ): Promise<void>;
  sendBulkEmail(
    recipients: string[],
    subject: string,
    content: string,
  ): Promise<void>;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}
