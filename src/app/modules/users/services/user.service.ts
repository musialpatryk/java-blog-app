import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { INewUser, IUser } from '../users.interface';
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
    if (this.user) {
      return of(this.user);
    }

    return this.userRepository.login(login, password)
      .pipe(
        tap((user) => this.store(user)),
      );
  }

  register({ login, password }: INewUser): Observable<void> {
    return this.userRepository.register(login, password)
      .pipe(
        tap(() => this.logout()),
      );
  }

  private store(user: IUser): void {
    this.user = user;
  }

  getToken(): string | undefined {
    return this.user?.accessToken;
  }

  getCurrentUser(): IUser | null {
    return this.user ? { ...this.user } : null;
  }

  logout(): void {
    this.user = null;
  }
}
