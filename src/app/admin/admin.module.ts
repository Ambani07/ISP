import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { CustomerService } from './shared/customer.service';


import { AdminComponent } from './admin.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../common/header/header.component';
import { SidenavComponent } from '../common/sidenav/sidenav.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerProductAddComponent } from './customer-product-add/customer-product-add.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';


const routes: Routes = [
    {path: 'admin',
    component: AdminComponent,
    children: [
        {path: '', component: DashboardComponent},
        {path: 'customers', component: CustomersComponent},
        {path: 'customer/:customerId', component: CustomerDetailsComponent},
        {path: 'customer-add', component: CustomerAddComponent},
        {path: 'customer-product-add', component: CustomerProductAddComponent}
    ]
}]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CustomersComponent,
    HeaderComponent,
    SidenavComponent,
    CustomerAddComponent,
    CustomerProductAddComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [CustomerService],
  bootstrap: []
})
export class AdminModule { }