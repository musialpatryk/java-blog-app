import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '../../modules/translations/pipes/translate.pipe';
import { UserService } from '../../modules/users/services/user.service';
import { IUser } from '../../modules/users/users.interface';

@Component({
  selector: 'app-logged-in-layout',
  imports: [
    RouterOutlet,
    TranslatePipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './logged-in-layout.component.html',
})
export class LoggedInLayoutComponent implements OnInit {
  currentUser!: IUser;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Not logged in!');
    }

    this.currentUser = currentUser;
  }

  logout(): void {
    this.userService.logout()
    this.router.navigate([ '' ]);
  }
}
