import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../users.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: IUser | null = null;

  constructor(
    private userRepository: UserRepository,
  ) {
  }

  login(login: string, password: string): Observable<IUser> {
    return this.userRepository.login(login, password)
      .pipe(
        tap((user) => this.store(user)),
      );
  }

  private store(user: IUser): void {
    this.user = user;
  }

  logout(): void {
    this.user = null;
  }
}
