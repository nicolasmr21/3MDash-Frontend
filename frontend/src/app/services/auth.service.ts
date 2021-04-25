import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';
import { JwtDTO } from '../models/jwt-dto';
import { AUTH_ENDPOINT } from "../utils/app.endpoints";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(userLogin: UserLogin): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(AUTH_ENDPOINT + 'login', userLogin);
  }
}
