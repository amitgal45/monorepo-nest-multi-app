import { GTMAnalyticsProvider } from './providers/gtm-analytics.provider';
import { AppsFlyerProvider } from './providers/appsflyer.provider';
import { AnalyticsProviderConfig } from './types';

export const analyticsProviderFactory = {
  provide: 'ANALYTICS_PROVIDERS',
  useFactory: (configs: AnalyticsProviderConfig[]) => {
    return configs.map((config) => {
      switch (config.type) {
        case 'gtm':
          return new GTMAnalyticsProvider(config);
        case 'appsflyer':
          return new AppsFlyerProvider(config);
        default:
          throw new Error(
            `Unsupported analytics provider type: ${config.type}`,
          );
      }
    });
  },
};
