import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONSUMPTION_ENDPOINT} from "../utils/app.endpoints";
import { ConsumptionUnitDto } from "../models/consumption-unit-dto";
import {MaxMinDateDto} from "../models/max-min-date-dto";

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  firstDateOfMonth: Date;
  lastDateOfMonth: Date;

  constructor(private httpClient: HttpClient) {
    const date = new Date();
    // for final version
    // this.firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    // this.lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.firstDateOfMonth = new Date(2020, 2, 1);
    this.lastDateOfMonth = new Date(2020, 2, 30);
  }

  getDataDateRange(contractId: string): Observable<MaxMinDateDto> {
    return this.httpClient.get<MaxMinDateDto>(CONSUMPTION_ENDPOINT + `maxmindate/get`, {
      params: { contractId }
    });
  }

  getData(contractId: string, measure: string, start?: Date, end?: Date): Observable<ConsumptionUnitDto[]> {
    return this.httpClient.get<ConsumptionUnitDto[]>(CONSUMPTION_ENDPOINT + `${measure}/filter`, {
      params: {
        contractId,
        start: start ? start.toISOString().split('T')[0] : this.firstDateOfMonth.toISOString().split('T')[0],
        end: end ? end.toISOString().split('T')[0] : this.lastDateOfMonth.toISOString().split('T')[0],
      }
    });
  }


  getMatrix(contractId: string, measure: string, start?: Date, end?: Date): Observable<string[][]> {
    return this.httpClient.get<string[][]>(CONSUMPTION_ENDPOINT + `${measure}/matrix/get`, {
      params: {
        contractId,
        start: start ? start.toISOString().split('T')[0] : this.firstDateOfMonth.toISOString().split('T')[0],
        end: end ? end.toISOString().split('T')[0] : this.lastDateOfMonth.toISOString().split('T')[0],
      }
    });
  }
}
