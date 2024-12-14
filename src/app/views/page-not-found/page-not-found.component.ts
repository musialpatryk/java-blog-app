import { Component } from '@angular/core';
import { TranslationsModule } from '../../modules/translations/translations.module';

@Component({
  selector: 'app-page-not-found',
  imports: [
    TranslationsModule,
  ],
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {

}
