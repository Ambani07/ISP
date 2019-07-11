import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
  @Input() isAdmin: boolean;
  breadCrumps: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
