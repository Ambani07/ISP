import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService} from '../../shared/customer.service';
import { Customer } from '../../shared/customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer;
  customerProduct: any;
  customerUserCreator: any;

  constructor( private route: ActivatedRoute,
               private customerService: CustomerService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.getCustomer(params.customerId);
      });
  }

  getCustomer(customerId: string){
    this.customerService.getCustomerId(customerId).subscribe(
      (customer: any) => {
        this.customer = customer[0];
        this.customerProduct = customer[2];
        this.customerUserCreator = customer[1];
        console.log(this.customerUserCreator);
      }
    );
  }



}
