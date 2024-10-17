import { Injectable } from '@nestjs/common';
import { IAnalyticsProvider } from '../types/analytics-provider.interface';
import { AnalyticsEvent, AnalyticsProviderConfig } from '../types';

@Injectable()
export class GTMAnalyticsProvider implements IAnalyticsProvider {
  constructor(private config: AnalyticsProviderConfig) {}

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    // Implement GTM-specific tracking logic
    console.log('GTM Analytics:', event);
  }

  async flushEvents(): Promise<void> {
    // Implement GTM-specific flush logic
  }
}
