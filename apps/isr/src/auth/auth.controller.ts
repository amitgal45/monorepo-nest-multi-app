import { AuthService } from '@app/auth';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  AnalyticsProviders,
  AnalyticsService,
  TrackAnalytics,
} from '@app/analytics';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(AnalyticsService)
    private readonly analyticsService: AnalyticsService,
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

  @Get('me')
  async me() {
    this.analyticsService.manualTrackEvent('user_me', { user: 'me' }, [
      AnalyticsProviders.GTM,
    ]);
  }
}
