import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { APP_NAME } from "../../utils/app.titles";
import { ThemeService } from "../../services/theme.service";
import { TokenService } from "../../services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  title = APP_NAME;
  icon: string;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(): void {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
    this.tokenService.logOut();
  }

  switchMode() {
    this.themeService.switchTheme();
    this.icon = localStorage.getItem('icon');
  }

  goToLogin() {
    return this.router.navigateByUrl('');
  }
}
