import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '../../modules/translations/pipes/translate.pipe';

@Component({
  selector: 'app-base-layout',
  imports: [
    RouterOutlet,
    TranslatePipe,
  ],
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {
}
