import {ITranslationConfig} from '../src/app/modules/translations/translations.interface';

const PL = {
  key: 'pl',
  translations: [
    {
      key: 'PAGE_NOT_FOUND',
      value: 'Nie znaleziono zasobu!',
    },
  ],
};

export const staticTranslations: ITranslationConfig = {
  defaultLanguage: PL['key'],
  languages: [
    PL,
  ],
};
