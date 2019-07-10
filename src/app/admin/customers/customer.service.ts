import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { OnInit } from '@angular/core';
import {DecimalPipe} from '@angular/common';

import { Customer } from './customer';
import { CUSTOMERS } from './customers';

// import { AdminService } from '../shared/customer.service';

import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from './sortable.directive';

interface SearchCustomerResult {
  customers: Customer[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(customers: Customer[], column: string, direction: string): Customer[] {
  if (direction === '') {
    return customers;
  } else {
    return [...customers].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(customer: Customer, term: string, pipe: PipeTransform) {
  return customer.name.toLowerCase().includes(term)
    || customer.surname.toLowerCase().includes(term)
    || customer.email.toLowerCase().includes(term)
    || customer.product.toLowerCase().includes(term)
    || customer.company.toLowerCase().includes(term);
}

@Injectable({providedIn: 'root'})
export class CustomerService implements OnInit{
  customers: Customer[] = [];
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  // private _customers$ = new BehaviorSubject<Country[]>([]);
  private _customers$ = new BehaviorSubject<Customer[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor( private pipe: DecimalPipe) {
    
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._customers$.next(result.customers);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  ngOnInit(){
    // const customerObservable = this.adminService.getCustomers();

    // customerObservable.subscribe(
    //   (customers: Customer[]) =>{
    //     this.customers = customers;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  get customers$() { 
    return this._customers$.asObservable();
  }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchCustomerResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let customers = sort(this.customers, sortColumn, sortDirection);

    // 2. filter
    customers = customers.filter(country => matches(country, searchTerm, this.pipe));
    const total = customers.length;

    // 3. paginate
    customers = customers.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({customers, total});
  }
}