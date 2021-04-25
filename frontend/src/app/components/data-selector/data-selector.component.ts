import { Component, OnInit } from '@angular/core';
import { ClientDto } from "../../models/client-dto";
import { ContractDto } from "../../models/contract-dto";
import { DataSelectorService } from "../../services/data-selector.service";
import {first, tap} from "rxjs/operators";
import {TokenService} from "../../services/token.service";
import {of} from "rxjs";

@Component({
  selector: 'app-data-selector',
  templateUrl: './data-selector.component.html',
  styleUrls: ['./data-selector.component.scss']
})
export class DataSelectorComponent implements OnInit {

  selectedClient: string;
  selectedContract: string;
  clients: ClientDto[];
  contracts: ContractDto[];
  roles: Array<string> = [];

  constructor(
    private dataSelectorService: DataSelectorService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.roles = this.tokenService.roles;
    this.getClients();
  }

  getClients(): void {
    this.dataSelectorService.getClients()
      .pipe(
        tap((clients) => this.clients = clients ),
        tap(() => this.selectedClient = this.dataSelectorService.getClient()),
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
          tap(() => this.dataSelectorService.setClient(clientId)),
          tap(() => this.selectedContract = this.dataSelectorService.getContract()),
          first()
        )
        .subscribe()
    : of(null);
  }

  onContractSelected(contractId: string) {
    this.dataSelectorService.setContract(contractId);
  }
}
