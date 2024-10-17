export * from './analytics-provider.interface';

export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: Date;
}

export interface AnalyticsProviderConfig {
  type: string;
  apiKey?: string;
}
