import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse} from '@angular/common/http';

import {Observable, from, throwError, of} from 'rxjs';
import {catchError, finalize, mergeMap, retry} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

// !req.url.includes('https://viacep.com.br')
export class NotAuthenticatedError {
}

@Injectable()
export class ProvimentoHttpInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/oauth/token') && !req.url.includes('https://viacep.com.br') && !this.authService.isAccessTokenInvalido()) {
      return from(this.authService.obterNovoAccessToken())
        .pipe(
          mergeMap(() => {
            if (this.authService.isAccessTokenInvalido()) {
              throw new NotAuthenticatedError();
            }
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            return next.handle(req);
          })
          );
        }
    return next.handle(req);
  }
}
