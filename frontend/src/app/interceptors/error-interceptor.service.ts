import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of} from 'rxjs';
import { TokenService } from '../services/token.service';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request)
      .pipe(
        catchError(err => {
          if ([401, 403].includes(err.status) && this.tokenService.getToken()) {
            // auto logout if 401 or 403 response returned from api
            this.tokenService.logOut();
          }
          const error = (err && err.error && err.error.message) || err.statusText;
          return of(error);
        })
      )
  }
}

export const interceptorErrorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}];
