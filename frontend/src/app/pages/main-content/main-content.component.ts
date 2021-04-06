import { Component } from '@angular/core';
import { MENU_ITEMS, PROFILE_ITEMS } from "../../utils/items.menu";
import { NbSidebarService } from "@nebular/theme";
import { APP_NAME } from "../../utils/app.titles";
import { ThemeService } from "../../services/theme.service";

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

  constructor(
    private sidebarService: NbSidebarService,
    private themeService: ThemeService,
  ) {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
  }

  toggle(): void {
    this.sidebarService.toggle(true);
  }

  switchMode() {
    this.themeService.switchTheme();
    this.icon = localStorage.getItem('icon');
  }
}
