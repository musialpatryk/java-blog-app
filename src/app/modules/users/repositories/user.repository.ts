import { Injectable } from '@angular/core';
import { IEditUser, IUser } from '../users.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  private readonly AUTH_PATH = 'auth';
  private readonly USER_PATH = 'users';

  constructor(private http: HttpClient) {
  }

  login(login: string, password: string): Observable<{user: IUser, accessToken: string}> {
    return this.http.post<{user: IUser, accessToken: string}>(
      `${this.AUTH_PATH}/login`,
      {
        login,
        password,
      },
    );
  }

  register(login: string, password: string): Observable<void> {
    return this.http.post<void>(
      `${this.AUTH_PATH}/register`,
      {
       login,
       password,
      },
    );
  }

  updateCurrentUser(user: IEditUser): Observable<IEditUser> {
    return this.http.put<IEditUser>(
      this.USER_PATH,
      user,
    );
  }
}
