import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import { tap } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";


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
  ) { }

  ngOnInit() {
    this.loading = true;
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
