import { DynamicModule, Global, Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { analyticsProviderFactory } from './analytics-provider.factory';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnalyticsInterceptor } from './interceptors/analytics.interceptor';
import { AnalyticsProviderConfig } from './types';

@Global()
@Module({})
export class AnalyticsModule {
  static forRootAsync(): DynamicModule {
    return {
      module: AnalyticsModule,
      imports: [ConfigModule], // Make sure to import ConfigModule
      providers: [
        AnalyticsService,
        AnalyticsInterceptor,
        {
          provide: 'ANALYTICS_PROVIDERS',
          useFactory: async (configService: ConfigService) => {
            const gtmApiKey = configService.get<string>('GTM_API_KEY');
            const appsFlyerApiKey =
              configService.get<string>('APPSFLYER_API_KEY');

            const configs: AnalyticsProviderConfig[] = [
              { type: 'gtm', apiKey: gtmApiKey },
              { type: 'appsflyer', apiKey: appsFlyerApiKey },
            ];

            return analyticsProviderFactory.useFactory(configs);
          },
          inject: [ConfigService],
        },
      ],
      exports: [AnalyticsService, AnalyticsInterceptor],
    };
  }
}
