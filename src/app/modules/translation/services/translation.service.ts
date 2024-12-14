import { Inject, Injectable } from '@angular/core';
import { TRANSLATION_CONFIG } from '../translation-config';
import { ITranslationConfig, ITranslationLanguage } from '../translation.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage: ITranslationLanguage | null = null;

  constructor(
    @Inject(TRANSLATION_CONFIG) private translationConfig: ITranslationConfig,
  ) {
    this.currentLanguage = this.getLanguage(this.translationConfig.defaultLanguage);
  }

  private getLanguage(searchedKey: string): ITranslationLanguage | null {
    const language = this.translationConfig.languages.find(
      ({ key }) => key === searchedKey,
    );

    if (!language) {
      return null;
    }

    return language;
  }

  translate(key: string): string {
    const translation = this.currentLanguage?.translations.find(
      (translation) => translation.key === key,
    );
    if (!translation) {
      return this.getPlaceHolder(key);
    }

    return translation.value
  }

  private getPlaceHolder(key: string): string {
    return key.replaceAll('_', ' ').toLowerCase();
  }
}
