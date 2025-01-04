import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { TRANSLATION_CONFIG } from './modules/translations/translation-config';
import { staticTranslations } from '../../config/translations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppInterceptors } from './services/app-interceptors.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
    ),
    provideHttpClient(
      withInterceptors([
        AppInterceptors.appendPrefix,
        AppInterceptors.sendAuthToken,
      ]),
    ),
    {
      provide: TRANSLATION_CONFIG,
      useValue: staticTranslations,
    },
  ],
};
