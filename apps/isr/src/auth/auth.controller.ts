import { AuthService } from '@app/auth';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  AnalyticsProviders,
  AnalyticsService,
  TrackAnalytics,
} from '@app/analytics';
import { EmailService } from '@app/email';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(AnalyticsService)
    private readonly analyticsService: AnalyticsService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  @TrackAnalytics('user_login', [
    AnalyticsProviders.GTM,
    AnalyticsProviders.AppsFlyer,
  ])
  async login(@Body() loginDto: any) {
    console.log('Hi');
    return { ...loginDto };
  }

  @Get('register')
  @TrackAnalytics('user_register', [AnalyticsProviders.GTM])
  async register(@Body() registerDto: any) {
    console.log('Hi');
    await this.emailService.sendTemplatedEmail({
      to: 'info@amit-gal.dev',
      templateId: 'welcome-email',
      templateData: {
        subscriber: {
          // Add this wrapper
          first_name: 'Amit',
          membership_level: 'basic',
          created_at: new Date(),
        },
      },
    });
    return { ...registerDto };
  }

  @Get('me')
  async me() {
    this.analyticsService.manualTrackEvent('user_me', { user: 'me' }, [
      AnalyticsProviders.GTM,
    ]);
  }
}
