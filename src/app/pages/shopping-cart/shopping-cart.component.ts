import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    public route: Router
  ) { }

  ngOnInit(): void {
  }

  goToCheckout() {
    this.route.navigate(['/checkout']);
  }

}
