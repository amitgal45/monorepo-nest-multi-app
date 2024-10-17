import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { AnalyticsService } from '../analytics.service';
import { ANALYTICS_EVENT } from '../decorator/analytics.decorator';

@Injectable()
export class AnalyticsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AnalyticsInterceptor.name);

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const analyticsEvent = this.reflector.get(
      ANALYTICS_EVENT,
      context.getHandler(),
    );

    if (!analyticsEvent) {
      return next.handle();
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          const request = context.switchToHttp().getRequest();
          const event = {
            name: analyticsEvent.eventName,
            properties: { ...request.body, result: data },
            timestamp: new Date(),
          };

          this.logger.log(`Tracking event: ${event.name}`);

          this.analyticsService
            .trackEvent(event, analyticsEvent.providers)
            .then(() =>
              this.logger.log(`Successfully tracked event: ${event.name}`),
            )
            .catch((error) =>
              this.logger.error(
                `Failed to track event: ${event.name}`,
                error.stack,
              ),
            );
        },
        error: (error) => {
          this.logger.error(
            `Error occurred while processing request`,
            error.stack,
          );
        },
      }),
    );
  }
}
