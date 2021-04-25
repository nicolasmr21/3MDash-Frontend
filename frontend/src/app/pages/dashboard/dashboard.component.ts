import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import {filter, tap} from "rxjs/operators";
import { combineLatest } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import {DataSelectorService} from "../../services/data-selector.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  options: any;
  theme: string;
  loading: boolean;
  activeData: string[][];
  reactiveData: string[][];

  constructor(
    private themeService: ThemeService,
    private dataSelectorService: DataSelectorService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.dataSelectorService.getContract$()
      .pipe(
        filter((value) => !!value),
        tap((contract) => console.log(contract)),
        tap(() => this.loading = false)
      )
      .subscribe();
    // combineLatest([
    //   this.themeService.getTheme$()
    //     .pipe(
    //       tap((theme) => this.theme = theme),
    //       tap(() => setTimeout(() => this.loading = false, 1000)),
    //     ),
    //   fromPromise(this.csvService.getActiveData()),
    //   fromPromise(this.csvService.getReactiveData())
    // ])
    //   .pipe(
    //     tap(([a, b, c]) => {
    //       this.activeData = b;
    //       this.reactiveData = c;
    //     }),
    //   )
    //   .subscribe()
  }
}
