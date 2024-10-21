import { Injectable, Inject } from '@nestjs/common';
import { IEmailProvider } from './interfaces/email-provider.interface';
import { ITemplateEngine } from './interfaces/template-engine.interface';
import { ITemplateRepository } from './interfaces/template-repository.interface';
import { SendTemplatedEmailDto } from './dto/send-templated-email.dto';
import { INJECTION_TOKENS } from './constants';

@Injectable()
export class EmailService {
  constructor(
    @Inject(INJECTION_TOKENS.EMAIL_PROVIDER)
    private readonly emailProvider: IEmailProvider,
    @Inject(INJECTION_TOKENS.TEMPLATE_ENGINE)
    private readonly templateEngine: ITemplateEngine,
    @Inject(INJECTION_TOKENS.TEMPLATE_REPOSITORY)
    private readonly templateRepository: ITemplateRepository,
  ) {}

  async sendTemplatedEmail(emailDto: SendTemplatedEmailDto): Promise<void> {
    const template = await this.templateRepository.findById(
      emailDto.templateId,
    );

    const [renderedSubject, renderedContent] = await Promise.all([
      this.templateEngine.renderSubject(
        template.subject,
        emailDto.templateData,
      ),
      this.templateEngine.render(template.content, emailDto.templateData),
    ]);

    await this.emailProvider.sendEmail(
      emailDto.to,
      renderedSubject,
      renderedContent,
    );
  }
}
