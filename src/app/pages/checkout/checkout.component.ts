import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public checkAddPhoneNumberDropDown: boolean;
  public checkShippingChoose: number;

  constructor() {

    this.checkAddPhoneNumberDropDown = false;
    this.checkShippingChoose = 1;
   }

  ngOnInit(): void {
  }


  addPhoneNumber() {
    this.checkAddPhoneNumberDropDown = !this.checkAddPhoneNumberDropDown;
  }

  chooseShipping(a: number) {
    this.checkShippingChoose = a;
  }

}
