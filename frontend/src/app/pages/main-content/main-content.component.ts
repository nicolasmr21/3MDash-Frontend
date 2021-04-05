import { Component } from '@angular/core';
import { MENU_ITEMS, PROFILE_ITEMS } from "../../utils/items.menu";
import { NbSidebarService, NbThemeService } from "@nebular/theme";
import { APP_NAME } from "../../utils/app.titles";

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
    private themeService: NbThemeService
  ) {
    this.icon = 'moon-outline';
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  switchMode() {
    if (this.themeService.currentTheme == 'default') {
      this.themeService.changeTheme('dark');
      this.icon = 'sun-outline';
    } else {
      this.themeService.changeTheme('default');
      this.icon = 'moon-outline';
    }
  }
}
