import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {APP_NAME} from "../../utils/app.titles";
import {Router} from "@angular/router";
import {ThemeService} from "../../services/theme.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {NbToastrService} from "@nebular/theme";
import {catchError, first, tap} from "rxjs/operators";
import {of} from "rxjs";
import {CreateUser} from "../../models/create-user";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  form: FormGroup;
  title = APP_NAME;
  icon: string;
  user: CreateUser;
  onCreateError: boolean;
  error: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private tokenService: UserService,
    private authService: AuthService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      client: ['', [Validators.required]],
      contract: ['', [Validators.required]],
    });
  }

  create() {
    this.onCreateError = false;
    const { user, password, client, contract } = this.form.value
    this.user = new CreateUser(user, password, client, contract);
    this.authService.createUser(this.user)
      .pipe(
        tap((response: any) => {
          this.toastService.show('Usuario creado correctamente', APP_NAME, { status: 'success' });
        }),
        catchError((err) => {
          this.toastService.show('Error en la creación, datos inconsistentes', APP_NAME, { status: 'danger' });
          return of(err);
        }),
        first()
      )
      .subscribe();
  }
}
