import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of} from 'rxjs';
import { TokenService } from '../services/token.service';
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request)
      .pipe(
        catchError(err => {
          if ([401].includes(err.status) && this.tokenService.getToken()) {
            this.authService.logOut();
            window.location.reload();
          }
          const error = (err && err.error && err.error.message) || err.statusText;
          return of(error);
        })
      )
  }
}

export const interceptorErrorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}];
