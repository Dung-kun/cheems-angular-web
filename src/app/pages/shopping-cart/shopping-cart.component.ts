import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginationPageViewModelComponent } from '../../shares/base/framework/pagination-page-view-model-component';
import { ShoppingCartPageViewModel } from './models/shopping-cart-page-view.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends PaginationPageViewModelComponent<ShoppingCartPageViewModel> implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(

    )
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }


  appRouteParams() {
    return this.route.params;
  }
}
