import { Injectable, Inject, Logger } from '@nestjs/common';
import { IAnalyticsProvider } from './types/analytics-provider.interface';
import { AnalyticsEvent } from './types';
import { AnalyticsProviders } from './decorator/analytics.decorator';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @Inject('ANALYTICS_PROVIDERS')
    private readonly providers: IAnalyticsProvider[],
  ) {}

  async trackEvent(
    event: AnalyticsEvent,
    providerNames?: AnalyticsProviders[],
  ): Promise<void> {
    const selectedProviders = providerNames
      ? this.providers.filter((provider) =>
          providerNames.includes(
            provider.constructor.name as AnalyticsProviders,
          ),
        )
      : this.providers;

    this.logger.log(
      `Tracking event: ${event.name} with providers: ${selectedProviders
        .map((p) => p.constructor.name)
        .join(', ')}`,
    );

    await Promise.all(
      selectedProviders.map(async (provider) => {
        try {
          await provider.trackEvent(event);
          this.logger.log(
            `Event ${event.name} tracked successfully with ${provider.constructor.name}`,
          );
        } catch (error) {
          this.logger.error(
            `Failed to track event ${event.name} with ${provider.constructor.name}`,
            error.stack,
          );
        }
      }),
    );
  }

  async flushEvents(): Promise<void> {
    await Promise.all(this.providers.map((provider) => provider.flushEvents()));
  }

  async manualTrackEvent(
    eventName: string,
    properties: Record<string, any>,
    providerNames?: AnalyticsProviders[],
  ): Promise<void> {
    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: new Date(),
    };
    await this.trackEvent(event, providerNames);
  }
}
