import { tap } from 'rxjs';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { UserService } from '../modules/users/services/user.service';
import { inject } from '@angular/core';

export abstract class AppInterceptors {
  private static readonly API_PATH = '/api/';
  private static readonly AUTHORIZATION_PREFIX = 'Bearer ';

  static appendPrefix: HttpInterceptorFn = (req, next) => {
      const modifiedRequest =  req.clone({
        url: `${this.API_PATH}${req.url}`,
      });

      return next(modifiedRequest);
  }

  static sendAuthToken: HttpInterceptorFn = (req, next) => {
    const userService = inject(UserService),
      modifiedRequest =  req.clone({
      headers: req.headers
        .set('Authorization', `${this.AUTHORIZATION_PREFIX}${userService.getToken()}`)
        .set('Content-Type', 'application/json'),
    });

    return next(modifiedRequest)
      .pipe(
        tap({
          error: (err: HttpErrorResponse) => {
            if (err.status === HttpStatusCode.Unauthorized) {
              userService.logout();
            }
          },
        }),
      );
  }
}
