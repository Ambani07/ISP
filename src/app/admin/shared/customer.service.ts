import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.model';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) {}

    public getCustomerId(customerId: string): any {
        return this.http.get('/api/v1/admin/' + customerId);
    }

    public getCustomers(): Observable<any> {
        return this.http.get('/api/v1/admin');
    }

}