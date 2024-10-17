import { Injectable } from '@nestjs/common';
import { IAnalyticsProvider } from '../types/analytics-provider.interface';
import { AnalyticsEvent, AnalyticsProviderConfig } from '../types';

@Injectable()
export class AppsFlyerProvider implements IAnalyticsProvider {
  constructor(private config: AnalyticsProviderConfig) {}

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    // Implement AppsFlyer-specific tracking logic
    console.log('AppsFlyer:', event);
  }

  async flushEvents(): Promise<void> {
    // Implement AppsFlyer-specific flush logic
  }
}
