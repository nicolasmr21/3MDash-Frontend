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

  getMaxValue(data: string[][]): number {
    return data?.reduce((prev, curr) => prev > parseFloat(curr[2]) ? parseFloat(curr[2]) : prev, 0)
  }
}
