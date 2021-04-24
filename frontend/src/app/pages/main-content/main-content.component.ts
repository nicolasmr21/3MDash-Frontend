import { Component } from '@angular/core';
import { MENU_ITEMS, PROFILE_ITEMS } from "../../utils/items.menu";
import { NbSidebarService } from "@nebular/theme";
import { APP_NAME } from "../../utils/app.titles";
import { ThemeService } from "../../services/theme.service";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {

  menu = MENU_ITEMS;
  title = APP_NAME;
  items = PROFILE_ITEMS;
  icon: string;
  username: string;

  constructor(
    private sidebarService: NbSidebarService,
    private themeService: ThemeService,
    private tokenService: TokenService,
  ) {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
    this.username = tokenService.getUserName();
  }

  toggle(): void {
    this.sidebarService.toggle(true);
  }

  switchMode() {
    this.themeService.switchTheme();
    this.icon = localStorage.getItem('icon');
  }
}
