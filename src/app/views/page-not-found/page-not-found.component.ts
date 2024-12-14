import { Component } from '@angular/core';
import { TranslationModule } from '../../modules/translation/translation.module';

@Component({
  selector: 'app-page-not-found',
  imports: [
    TranslationModule,
  ],
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {

}
