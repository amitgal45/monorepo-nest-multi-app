import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplate } from '@app/db';
import { EmailService } from './email.service';
import { INJECTION_TOKENS, EmailProviderType } from './constants';
import { SendGridProvider } from './providers/sendgrid.provider';
import { MailgunProvider } from './providers/mailgun.provider';
import { LiquidTemplateEngine } from './templates/liquid-engine.service';
import { EmailTemplateRepository } from './repositories/email-template.repository';

@Global()
@Module({})
export class EmailModule {
  static forRoot(): DynamicModule {
    return {
      module: EmailModule,
      imports: [TypeOrmModule.forFeature([EmailTemplate])],
      providers: [
        EmailService,
        {
          provide: INJECTION_TOKENS.EMAIL_PROVIDER,
          useFactory: (configService: ConfigService) => {
            const provider = configService.get('EMAIL_PROVIDER');
            const apiKey = configService.get(
              provider === EmailProviderType.SENDGRID
                ? 'SENDGRID_API_KEY'
                : 'MAILGUN_API_KEY',
            );
            const fromEmail = configService.get(
              provider === EmailProviderType.SENDGRID
                ? 'SENDGRID_FROM_EMAIL'
                : 'MAILGUN_FROM_EMAIL',
            );

            if (!apiKey || !fromEmail) {
              throw new Error(`Missing configuration for ${provider} provider`);
            }

            return provider === EmailProviderType.SENDGRID
              ? new SendGridProvider(apiKey, fromEmail)
              : new MailgunProvider(apiKey, fromEmail);
          },
          inject: [ConfigService],
        },
        {
          provide: INJECTION_TOKENS.TEMPLATE_ENGINE,
          useClass: LiquidTemplateEngine,
        },
        EmailTemplateRepository,
        {
          provide: INJECTION_TOKENS.TEMPLATE_REPOSITORY,
          useClass: EmailTemplateRepository,
        },
      ],
      exports: [EmailService],
    };
  }
}
