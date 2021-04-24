import { Component, OnInit } from '@angular/core';
import { ClientDto } from "../../models/client-dto";
import { ContractDto } from "../../models/contract-dto";

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

  constructor() { }

  ngOnInit(): void {
  }

}
