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
import {ClientDto} from "../../models/client-dto";
import {ContractDto} from "../../models/contract-dto";
import {DataSelectorService} from "../../services/data-selector.service";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  form: FormGroup;
  title = APP_NAME;
  user: CreateUser;
  onCreateError: boolean;
  error: string;
  selectedRol: string;
  clients: ClientDto[];
  contracts: ContractDto[];
  selectedClient: string;
  selectedContract: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private tokenService: UserService,
    private authService: AuthService,
    private toastService: NbToastrService,
    private dataSelectorService: DataSelectorService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getClients();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rol: ['', [Validators.required]],
      client: [null, []],
      contract: [null, []],
    });
  }

  create(): void {
    if((this.selectedRol == 'client-admin') && !this.form.value.client) {
      this.toastService.show('Debe seleccionar el cliente', APP_NAME, { status: 'warning' });
    } else if((this.selectedRol == 'contract-admin') && !this.form.value.contract) {
      this.toastService.show('Debe seleccionar el contrato', APP_NAME, { status: 'warning' });
    } else {
      const { user, password, client, contract } = this.form.value
      this.user = new CreateUser(user, password, client, contract);
      this.authService.createUser(this.user)
        .pipe(
          tap((response: any) => {
            this.toastService.show('Usuario creado correctamente', APP_NAME, { status: 'success' });
            this.resetValues();
          }),
          catchError((err) => {
            this.toastService.show('Error en la creación, datos inconsistentes', APP_NAME, { status: 'danger' });
            this.resetValues();
            return of(err);
          }),
          first()
        )
        .subscribe();
    }
  }

  getClients(): void {
    this.dataSelectorService.getClients()
      .pipe(
        tap((clients) => this.clients = clients ),
        tap(() => this.onClientSelected(this.selectedClient)),
        first()
      )
      .subscribe();
  }

  onClientSelected(clientId: string) {
    clientId
      ? this.dataSelectorService.getContractsByClient(clientId)
        .pipe(
          tap((contracts) => this.contracts = contracts ),
          first()
        )
        .subscribe()
      : of(null);
  }

  resetValues() {
    this.selectedClient = null;
    this.selectedContract = null;
    this.form.value.client = null;
    this.form.value.contract = null;
  }
}
