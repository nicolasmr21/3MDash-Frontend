import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(
    private papa: Papa,
    private http: HttpClient,
  ) {
  }

  async getActiveData(): Promise<string[][]> {
    const active = await this.http.get('assets/activa.csv', {responseType: 'text'}).toPromise();
    return this.papa.parse(active, {delimiter: ';'}).data.slice(1,);
  }

  async getReactiveData(): Promise<string[][]> {
    const reactive = await this.http.get('assets/reactiva.csv', {responseType: 'text'}).toPromise();
    return this.papa.parse(reactive, {delimiter: ';'}).data.slice(1,);
  }
}
