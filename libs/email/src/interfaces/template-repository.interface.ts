import { EmailTemplate } from '@app/db';

export interface ITemplateRepository {
  findById(id: string): Promise<EmailTemplate>;
  save(template: EmailTemplate): Promise<void>;
}
