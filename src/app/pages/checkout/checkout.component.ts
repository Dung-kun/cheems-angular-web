import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public checkAddPhoneNumberDropDown: boolean;

  constructor() {

    this.checkAddPhoneNumberDropDown = false;
   }

  ngOnInit(): void {
  }


  addPhoneNumber() {
    this.checkAddPhoneNumberDropDown = !this.checkAddPhoneNumberDropDown;
  }

}
