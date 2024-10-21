import { Injectable } from '@nestjs/common';
import { Liquid } from 'liquidjs';
import { ITemplateEngine } from '../interfaces/template-engine.interface';

@Injectable()
export class LiquidTemplateEngine implements ITemplateEngine {
  private engine: Liquid;

  constructor() {
    this.engine = new Liquid({
      cache: process.env.NODE_ENV === 'production',
      strictFilters: true,
      strictVariables: true,
    });

    this.registerCustomFilters();
  }

  private registerCustomFilters(): void {
    this.engine.registerFilter('price', (value: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    });

    this.engine.registerFilter('date', (value: string, format: string) => {
      return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    });
  }

  async render(template: string, data: Record<string, any>): Promise<string> {
    return this.engine.parseAndRender(template, data);
  }

  async renderSubject(
    template: string,
    data: Record<string, any>,
  ): Promise<string> {
    return this.engine.parseAndRender(template, data);
  }
}
