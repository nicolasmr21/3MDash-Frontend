import { Component } from '@angular/core';
import { MENU_ITEMS, PROFILE_ITEMS } from "../../utils/items.menu";
import { NbSidebarService } from "@nebular/theme";
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

  constructor(
    private sidebarService: NbSidebarService
  ) {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}

