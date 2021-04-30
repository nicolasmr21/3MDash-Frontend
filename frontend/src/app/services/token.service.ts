import { Injectable } from '@angular/core';
import {JwtDTO} from "../models/jwt-dto";

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const CLIENT_ID = 'AuthClientId';
const CONTRACT_ID = 'AuthContractId';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];
  user: JwtDTO;

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getClientId(): string {
    return sessionStorage.getItem(CLIENT_ID);
  }

  public getContractId(): string {
    return sessionStorage.getItem(CONTRACT_ID);
  }

  public setClientId(clientId: string): void {
    window.sessionStorage.removeItem(CLIENT_ID);
    window.sessionStorage.setItem(CLIENT_ID, clientId);
  }

  public setContractId(contractId: string): void {
    window.sessionStorage.removeItem(CONTRACT_ID);
    window.sessionStorage.setItem(CONTRACT_ID, contractId);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }
}
