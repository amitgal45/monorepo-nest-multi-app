import { SetMetadata } from '@nestjs/common';

export const AnalyticsProviders = {
  GTM: 'GTMAnalyticsProvider',
  AppsFlyer: 'AppsFlyerProvider',
} as const;

export type AnalyticsProviders =
  typeof AnalyticsProviders[keyof typeof AnalyticsProviders];

export const ANALYTICS_EVENT = 'analytics_event';
export const TrackAnalytics = (
  eventName: string,
  providers?: AnalyticsProviders[],
) => SetMetadata(ANALYTICS_EVENT, { eventName, providers });
