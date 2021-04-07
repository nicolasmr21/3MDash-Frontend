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
  activeData: string[][];

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.themeService.getTheme$()
      .pipe(
        tap((theme) => this.theme = theme)
      )
      .subscribe()
  }
}
