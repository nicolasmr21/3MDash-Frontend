import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  options: any;
  theme: string;
  loading: boolean;

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.themeService.getTheme$()
      .pipe(
        tap((theme) => this.theme = theme),
        tap(() => setTimeout(() => this.loading = false, 1000)),
      )
      .subscribe()
  }
}
