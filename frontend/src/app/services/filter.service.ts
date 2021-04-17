import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
  ) {
  }

  filterDataByPeriod(period: string, data: string[][]): string[][] {
    switch (period) {
      case 'day':
        return  data?.slice(data.length-24);
      case 'week':
        return data?.slice(data.length-168);
      case 'month':
        return data?.slice(data.length-5000);
      default:
        return data;
    }
  }

  getMaxValue(data: string[][]): string[] {
    const index = data?.reduce((prev, curr, i) => parseFloat(data[prev][2]) < parseFloat(curr[2]) ? i : prev, 0)
    return data[index];
  }
}
