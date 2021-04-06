import { Injectable } from '@angular/core';
import {NbThemeService} from "@nebular/theme";
import {BehaviorSubject, from, Observable, of, Subject} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private activeTheme: BehaviorSubject<string> = new BehaviorSubject<string>('default');

  constructor(
    private themeService: NbThemeService
  ) {
  }

  changeTheme(newTheme: string): void {
    this.themeService.changeTheme(newTheme);
  }

  getTheme$(): Observable<string> {
    return from(this.activeTheme);
  }

  getTheme(): string {
    return this.activeTheme.getValue();
  }

  updateTheme$(): Observable<any> {
    return this.themeService.onThemeChange()
      .pipe(
        tap((theme) => this.activeTheme.next(theme.name)),
      );
  }
}
