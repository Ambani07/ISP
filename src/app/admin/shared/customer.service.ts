import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.model';

@Injectable()
export class CustomerService {

    private customers: Customer[] = [{
        _id: "1",
        name: "Ambani",
        surname: "Matsedu",
        email: "example@gmail.com",
        product: "EI",
        company: "BCX",
        term: 5 ,
        status: true,
        createdAt: "10/7/2019"
    },
    {
        _id: "2",
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        product: "Ti-DIS",
        company: "BCX",
        term: 5,
        status: true,
        createdAt: "10/7/2019"
    },
    {
        _id: "3",
        name: "Lionel",
        surname: "Messi",
        email: "lionel.messi@gmail.com",
        product: "EI",
        company: "BCX",
        term: 5,
        status: true,
        createdAt: "10/7/2019"
    }];
    constructor(private http: HttpClient) {}

    public getCustomerId(customerId: string): Observable<Customer>{
        return new Observable<Customer>((observer) => {
            setTimeout(() => {
                const foundCustomer = this.customers.find((customer) => {
                    return customer._id == customerId;
                });

                observer.next(foundCustomer);

            }, 500);
        });
    }

    public getCustomers(): Observable<Customer[]> {

        return new Observable<Customer[]>((observer) => {

            setTimeout(()=>{
                observer.next(this.customers);
            }, 1000);
        });
        
    }

}