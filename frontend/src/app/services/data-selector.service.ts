import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CLIENTS_ENDPOINT, CONTRACTS_ENDPOINT } from "../utils/app.endpoints";
import { ClientDto } from "../models/client-dto";
import {BehaviorSubject, Observable} from "rxjs";
import { ContractDto } from "../models/contract-dto";

const CLIENT_KEY = 'SessionClient';
const CONTRACT_KEY = 'SessionContract';

@Injectable({
  providedIn: 'root'
})
export class DataSelectorService {

  contractSelected: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private httpClient: HttpClient
  ) {
    this.contractSelected.next(this.getContract());
  }

  public getClients(): Observable<ClientDto[]> {
    return this.httpClient.get<ClientDto[]>(CLIENTS_ENDPOINT + 'get');
  }

  public getContractsByClient(clientId: string): Observable<ContractDto[]> {
    return this.httpClient.get<ContractDto[]>(CONTRACTS_ENDPOINT + `getbyclient/${clientId}`);
  }

  public setClient(client: string): void {
    sessionStorage.removeItem(CLIENT_KEY);
    sessionStorage.setItem(CLIENT_KEY, client);
  }

  public setContract(contract: string): void {
    sessionStorage.removeItem(CONTRACT_KEY);
    sessionStorage.setItem(CONTRACT_KEY, contract);
    this.contractSelected.next(this.getContract());
  }

  public getClient(): string {
    return sessionStorage.getItem(CLIENT_KEY);
  }

  public getContract(): string {
    return sessionStorage.getItem(CONTRACT_KEY);
  }

  public getContract$(): Observable<string> {
    return this.contractSelected.asObservable();
  }
}
