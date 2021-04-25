import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONSUMPTION_ENDPOINT} from "../utils/app.endpoints";
import { ConsumptionUnitDto } from "../models/consumption-unit-dto";

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  constructor(private httpClient: HttpClient) { }

  public getActiveData(contractId): Observable<ConsumptionUnitDto[]> {
    return this.httpClient.get<ConsumptionUnitDto[]>(CONSUMPTION_ENDPOINT + `filteractive?contractId=${contractId}`);
  }

  public getReactiveData(contractId): Observable<ConsumptionUnitDto[]> {
    return this.httpClient.get<ConsumptionUnitDto[]>(CONSUMPTION_ENDPOINT + `filterreactive?contractId=${contractId}`);
  }
}
