import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import { Customer } from '../shared/customer.model';

import {CustomerService} from '../shared/customer.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    const customersObservable = this.customerService.getCustomers();

    customersObservable.subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      },
      (err) => {

      }
    );
  }







}
