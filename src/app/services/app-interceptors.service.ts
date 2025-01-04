import { tap } from 'rxjs';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { UserService } from '../modules/users/services/user.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export abstract class AppInterceptors {
  private static readonly API_PATH = '/api/';
  private static readonly MAIN_APP_URL = '/app';
  private static readonly AUTHORIZATION_PREFIX = '';

  static appendPrefix: HttpInterceptorFn = (req, next) => {
      const modifiedRequest =  req.clone({
        url: `${this.API_PATH}${req.url}`,
      });

      return next(modifiedRequest);
  }

  static sendAuthToken: HttpInterceptorFn = (req, next) => {
    const  router = inject(Router),
      userService = inject(UserService),
      modifiedRequest =  req.clone({
      headers: req.headers
        .set('Authorization', `${this.AUTHORIZATION_PREFIX}${userService.getToken()}`)
        .set('Content-Type', 'application/json'),
    });

    return next(modifiedRequest)
      .pipe(
        tap({
          error: (err: HttpErrorResponse) => {
            if (err.status !== HttpStatusCode.Unauthorized) {
              return;
            }

            userService.logout();

            if (router.url.startsWith(this.MAIN_APP_URL)) {
              router.navigate([ '' ]);
            }
          },
        }),
      );
  }
}
