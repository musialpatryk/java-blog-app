import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { INewUser, IUser } from '../users.interface';
import { UserRepository } from '../repositories/user.repository';
import { StorageService } from '../../../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USER_KEY = 'currentUser';

  private user: IUser | null = null;

  constructor(
    private userRepository: UserRepository,
    private storageService: StorageService,
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
    this.storageService.setItem(
      this.USER_KEY,
      user,
    );
  }

  getToken(): string | undefined {
    return this.getCurrentUser()?.accessToken;
  }

  getCurrentUser(): IUser | null {
    if (this.user) {
      return { ...this.user };
    }

    const storedUser = this.storageService.getItem<IUser>(this.USER_KEY);
    if (!storedUser) {
      return null;
    }

    this.user = storedUser;

    return { ...this.user };
  }

  logout(): void {
    this.user = null;
    this.storageService.removeItem(this.USER_KEY);
  }
}
