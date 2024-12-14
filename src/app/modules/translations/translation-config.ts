import { InjectionToken } from '@angular/core';
import { ITranslationConfig } from './translations.interface';

export const TRANSLATION_CONFIG = new InjectionToken<ITranslationConfig>('TRANSLATION_CONFIG');
