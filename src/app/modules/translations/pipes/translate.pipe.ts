import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(
    private readonly translationService: TranslationService,
  ) {
  }
  transform(key: string): unknown {
    return this.translationService.translate(key);
  }
}
