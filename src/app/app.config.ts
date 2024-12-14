import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TRANSLATION_CONFIG } from './modules/translations/translation-config';
import { staticTranslations } from '../../config/translations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: TRANSLATION_CONFIG,
      useValue: staticTranslations,
    },
  ],
};
