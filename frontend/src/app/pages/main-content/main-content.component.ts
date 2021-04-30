import { Component, OnInit} from '@angular/core';
import { MENU_ITEMS, PROFILE_ITEMS } from "../../utils/items.menu";
import {NbSidebarService, NbToastrService} from "@nebular/theme";
import { APP_NAME } from "../../utils/app.titles";
import { ThemeService } from "../../services/theme.service";
import { TokenService } from "../../services/token.service";
import { Router } from "@angular/router";
import {DataSelectorService} from "../../services/data-selector.service";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {

  menu = MENU_ITEMS;
  title = APP_NAME;
  items = PROFILE_ITEMS;
  icon: string;
  username: string;

  constructor(
    private sidebarService: NbSidebarService,
    private themeService: ThemeService,
    private tokenService: TokenService,
    private router: Router,
    private toastService: NbToastrService,
    private dataSelectorService: DataSelectorService,
  ) {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
    this.username = tokenService.getUserName();
  }

  ngOnInit(): void {
    this.router.navigateByUrl('/dashboard').finally(() => this.showMessageDialog());
  }

  showMessageDialog() {
    const roles = this.tokenService.getAuthorities();
    const isGranted = roles.includes('superadmin') || roles.includes('client-admin')
    if((!this.dataSelectorService.getClient() || !this.dataSelectorService.getContract()) && isGranted) {
      this.toastService.show(this.getMessage(roles), APP_NAME, { status: 'info' });
    }
  }

  getMessage(roles: string[]): string {
    if(roles.includes('superadmin')) {
      return 'Elegir cliente y contrato para desplegar datos'
    } else {
      return 'Elegir contrato para desplegar datos'
    }
  }

  toggle(): void {
    this.sidebarService.toggle(true);
  }

  switchMode() {
    this.themeService.switchTheme();
    this.icon = localStorage.getItem('icon');
  }
}
