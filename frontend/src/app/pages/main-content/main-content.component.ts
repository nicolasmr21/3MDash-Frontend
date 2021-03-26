import { Component } from '@angular/core';
import { MENU_ITEMS } from "../../utils/pages.menu";
import { NbSidebarService } from "@nebular/theme";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {

  menu = MENU_ITEMS;

  constructor(
    private sidebarService: NbSidebarService
  ) {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}

