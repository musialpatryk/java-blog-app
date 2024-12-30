import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserService } from '../../modules/users/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../modules/translations/pipes/translate.pipe';
import { ValidationErrorsComponent } from '../../components/validation-errors/validation-errors.component';
import { NgIf } from '@angular/common';
import { CardInCenterComponent } from '../../components/card-in-center/card-in-center.component';

@Component({
  selector: 'app-register',
  imports: [
    TranslatePipe,
    ValidationErrorsComponent,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    CardInCenterComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  createUserForm!: FormGroup;
  passwordControls!: {
    password: FormControl;
    repeatPassword: FormControl;
  };
  creationError = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.initializeFormControls();
  }

  private initializeFormControls(): void {
    const passwordControl = new FormControl('', Validators.required),
      repeatPasswordControl = new FormControl('', Validators.required);

    this.createUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
      passwords: new FormGroup({
          password: passwordControl,
          repeatPassword: repeatPasswordControl,
        },
        (group: AbstractControl):  ValidationErrors | null => {
          const pass = group.get('password')!.value,
            confirmPass = group.get('repeatPassword')!.value
          return pass === confirmPass ? null : { notSame: true }
        },
      ),
    });

    this.passwordControls = {
      password: passwordControl,
      repeatPassword: repeatPasswordControl,
    }
  }

  createAccount(): void {
    if (this.createUserForm.invalid) {
      return;
    }

    const payload = {
      login: this.createUserForm.get('username')!.value,
      password: this.createUserForm.get('passwords.password')!.value,
    };
    this.userService.register(payload)
      .subscribe({
        next: () => {
          this.router.navigate([ '/login' ]);
        },
        error: () => {
          this.creationError = true;
        },
      })
  }
}
