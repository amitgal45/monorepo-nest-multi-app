export interface IEmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  metadata?: Record<string, any>;
}
