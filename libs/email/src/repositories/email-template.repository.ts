import { EmailTemplate } from '@app/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ITemplateRepository } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmailTemplateRepository implements ITemplateRepository {
  constructor(
    @InjectRepository(EmailTemplate)
    private repository: Repository<EmailTemplate>,
  ) {}

  save(template: EmailTemplate): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<EmailTemplate> {
    const template = await this.repository.findOne({ where: { id } });
    if (!template) throw new NotFoundException(`Template ${id} not found`);
    return template;
  }
}
