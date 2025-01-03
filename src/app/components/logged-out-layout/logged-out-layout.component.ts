import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '../../modules/translations/pipes/translate.pipe';

@Component({
  selector: 'app-logged-out-layout',
  imports: [
    RouterOutlet,
    TranslatePipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './logged-out-layout.component.html',
  styleUrl: './logged-out-layout.component.scss',
})
export class LoggedOutLayoutComponent {

}
