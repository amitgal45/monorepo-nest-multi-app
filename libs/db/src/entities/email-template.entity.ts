import { IEmailTemplate } from '@app/email';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EmailTemplate implements IEmailTemplate {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column('text')
  content: string;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;
}
