import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '../../modules/translations/pipes/translate.pipe';
import { UserService } from '../../modules/users/services/user.service';

@Component({
  selector: 'app-logged-in-layout',
  imports: [
    RouterOutlet,
    TranslatePipe,
  ],
  templateUrl: './logged-in-layout.component.html',
})
export class LoggedInLayoutComponent {
  constructor(
    private router: Router,
    private userService: UserService,
  ) {
  }

  logout(): void {
    this.userService.logout()
    this.router.navigate([ '' ]);
  }
}
