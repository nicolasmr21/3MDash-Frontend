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

  public getActiveData(contractId: string, start?: Date, end?: Date): Observable<ConsumptionUnitDto[]> {
    return this.httpClient.get<ConsumptionUnitDto[]>(CONSUMPTION_ENDPOINT + `filteractive`, {
      params: {
        contractid: contractId,
        start: start ? start.toLocaleString() : '2020/01/01',
        end: end ? end.toLocaleString() : '2020/12/30',
      }
    });
  }

  public getReactiveData(contractId: string, start?: Date, end?: Date): Observable<ConsumptionUnitDto[]> {
    return this.httpClient.get<ConsumptionUnitDto[]>(CONSUMPTION_ENDPOINT + `filterreactive`, {
      params: {
        contractid: contractId,
        start: start ? start.toLocaleString() : '2020/01/01',
        end: end ? end.toLocaleString() : '2020/12/30',
      }
    });
  }
}
