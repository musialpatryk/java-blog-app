import { Component, Input } from '@angular/core';
import { TranslatePipe } from '../../../translations/pipes/translate.pipe';
import { FormsModule } from '@angular/forms';
import { IEditUser } from '../../users.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  imports: [
    TranslatePipe,
    FormsModule,
  ],
})
export class UserFormComponent {
  @Input() user!: IEditUser;

  constructor(
    private userService: UserService,
  ) {
  }

  save(): void {
    this.userService.updateCurrentUser(this.user)
      .subscribe((savedUser) => {
        this.user = savedUser;
      });
  }
}
