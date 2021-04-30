import { Injectable } from '@angular/core';
import { ConsumptionUnitDto } from "../models/consumption-unit-dto";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
  ) {
  }

  filterDataByPeriod(period: string, data: ConsumptionUnitDto[]): ConsumptionUnitDto[] {
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

  getMaxValue(data: ConsumptionUnitDto[]): ConsumptionUnitDto {
    const index = data?.reduce((prev, curr, i) => data[prev].consumptionUnits < curr.consumptionUnits ? i : prev, 0)
    return data[index] ? data[index] : { consumptionUnits: 0, dateConsumption: ''};
  }
}
