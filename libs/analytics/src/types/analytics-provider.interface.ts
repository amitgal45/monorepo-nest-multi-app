import { AnalyticsEvent } from '.';

export interface IAnalyticsProvider {
  trackEvent(event: AnalyticsEvent): Promise<void>;
  flushEvents(): Promise<void>;
}
