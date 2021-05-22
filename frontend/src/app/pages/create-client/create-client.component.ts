import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
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
  selectedRol: string = '';

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
      rol: ['', [Validators.required]],
      client: ['', []],
      contract: ['', []],
    });
  }

  create() {
    if((this.selectedRol == 'client-admin') && !this.form.value.client) {
      this.toastService.show('Debe ingresar el identificador de cliente', APP_NAME, { status: 'warning' });
    } else if((this.selectedRol == 'contract-admin') && !this.form.value.contract) {
      this.toastService.show('Debe ingresar el identificador de contrato', APP_NAME, { status: 'warning' });
    } else {
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
}
