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

  private roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getClientId(): string {
    return sessionStorage.getItem(CLIENT_ID);
  }

  getContractId(): string {
    return sessionStorage.getItem(CONTRACT_ID);
  }

  setClientId(clientId: string): void {
    window.sessionStorage.removeItem(CLIENT_ID);
    window.sessionStorage.setItem(CLIENT_ID, clientId);
  }

  setContractId(contractId: string): void {
    window.sessionStorage.removeItem(CONTRACT_ID);
    window.sessionStorage.setItem(CONTRACT_ID, contractId);
  }

  setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }
}
