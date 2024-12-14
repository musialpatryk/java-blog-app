import { Injectable } from '@angular/core';
import { IUser } from '../users.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  login(login: string, password: string): Observable<IUser> {
    return of({
      login: login,
      name: password,
      surname: 'random-surname',
      bio: 'some bio',
      token: 'random-token',
    });
  }
}
