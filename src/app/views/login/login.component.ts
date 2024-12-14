import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../modules/users/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../modules/translations/pipes/translate.pipe';
import { ValidationErrorsComponent } from '../../components/validation-errors/validation-errors.component';
import { NgIf } from '@angular/common';
import { CardInCenterComponent } from '../../components/card-in-center/card-in-center.component';

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe,
    ValidationErrorsComponent,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    CardInCenterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  loginError = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  tryLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const login = this.loginForm.get('login')?.value,
      password = this.loginForm.get('password')?.value;

    if (!login || !password) {
      this.loginError = true;
      return;
    }

    this.userService.login(login, password)
      .subscribe({
        next: () => {
          this.router.navigate([ 'app' ]);
        },
        error: () => {
          this.loginError = true;
          this.loginForm.reset();
        },
      });
  }
}
