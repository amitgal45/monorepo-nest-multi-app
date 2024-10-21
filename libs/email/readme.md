# NestJS Email Service with Liquid Templates

A fully-featured email service for NestJS applications with support for Liquid templates, multiple email providers (SendGrid, Mailgun), and TypeORM integration.

## Features

- 📧 Multiple email provider support (SendGrid, Mailgun)
- 📝 Liquid template engine integration
- 🗃️ PostgreSQL template storage
- ✨ Type-safe implementation
- 🔄 Easy provider switching
- 🎯 SOLID principles adherence

## Installation

```bash
npm install @app/email-service
```

## Environment Variables

```env
EMAIL_PROVIDER=sendgrid|mailgun
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=your@email.com
MAILGUN_API_KEY=your_mailgun_key
MAILGUN_DOMAIN=your.domain.com
MAILGUN_FROM_EMAIL=your@email.com
```

## Module Setup

```typescript
import { EmailModule } from '@app/email-service';

@Module({
  imports: [
    EmailModule,
    // ... other modules
  ],
})
export class AppModule {}
```

## Template Format

Templates are stored in the database with the following structure:

```typescript
{
  id: string;
  subject: string;  // Supports Liquid syntax
  content: string;  // Supports Liquid syntax
}
```

Example template:
```typescript
{
  id: "welcome-email",
  subject: "Welcome {{ subscriber.first_name | default: 'there' }}!",
  content: `
    Hello {{ subscriber.first_name | default: 'there' }}!
    
    {% if subscriber.membership_level == 'premium' %}
      Welcome to your Premium membership!
    {% else %}
      Welcome to your Basic membership!
    {% endif %}
    
    Your account was created on {{ subscriber.created_at | date: "%B %d, %Y" }}.
  `
}
```

## Usage

```typescript
import { EmailService } from '@app/email-service';

@Injectable()
export class UserService {
  constructor(private readonly emailService: EmailService) {}

  async sendWelcomeEmail(user: User) {
    await this.emailService.sendTemplatedEmail({
      to: user.email,
      templateId: "welcome-email",
      templateData: {
        subscriber: {
          first_name: user.firstName,
          membership_level: user.membershipLevel,
          created_at: user.createdAt
        }
      }
    });
  }
}
```

## Custom Template Engine

Implement `ITemplateEngine` to create your own template engine:

```typescript
@Injectable()
export class CustomTemplateEngine implements ITemplateEngine {
  async render(template: string, data: Record<string, any>): Promise<string> {
    // Your implementation
  }

  async renderSubject(template: string, data: Record<string, any>): Promise<string> {
    // Your implementation
  }
}
```

## Custom Email Provider

Implement `IEmailProvider` to add a new email provider:

```typescript
@Injectable()
export class CustomProvider implements IEmailProvider {
  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    // Your implementation
  }
}
```

## License

MIT

## Contributing

Pull requests are welcome. Please make sure to update tests as appropriate.
