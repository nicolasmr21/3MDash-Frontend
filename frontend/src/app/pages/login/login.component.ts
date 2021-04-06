import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { APP_NAME } from "../../utils/app.titles";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  title = APP_NAME;
  icon: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    this.router.navigateByUrl('main/dashboard');
  }

  switchMode() {
    this.themeService.switchTheme();
    this.icon = localStorage.getItem('icon');
  }
}
