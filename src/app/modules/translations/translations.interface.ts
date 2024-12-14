export interface ITranslation {
  readonly key: string;
  readonly value: string;
}

export interface ITranslationLanguage {
  readonly key: string;
  readonly translations: ITranslation[];
}

export interface ITranslationConfig {
  readonly languages: ITranslationLanguage[];
  readonly defaultLanguage: string;
}
