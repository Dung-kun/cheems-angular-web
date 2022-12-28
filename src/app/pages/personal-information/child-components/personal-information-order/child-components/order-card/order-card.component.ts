import { Component, Input, OnInit, Output } from '@angular/core';
import { PageViewModelBasedComponent } from '@app/shares/base/framework/page-view-model-based-component';
import { CurrencyShowPipe } from '@app/shares/base/pipes/currency-show/currency-show.pipe';
import { EventEmitter } from 'stream';
import { OrderCardPageViewModel } from './models/order-card-page-view.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent extends PageViewModelBasedComponent<OrderCardPageViewModel> implements OnInit {
  @Input() order: any = null;
  public status: number = 0;
  public totalAmount: number = 0;
  public totalPrice: any = null;

  public icon_link: string = '';

  constructor() {
    super();
  }

  ngOnInit(): void {
    switch (this.order?.status) {
      case "accept":
        this.icon_link = 'ic_accept.svg'
      break;

      case "packaging":
        this.icon_link = 'ic_packaging.svg'
      break;

      case "shipping":
        this.icon_link = 'ic_transport.svg'
      break;

      case "receive":
        this.icon_link = 'ic_delivery.svg'
      break;

      case "done":
        this.icon_link = 'ic_completed.svg'
      break;

      case "cancel":
        this.icon_link = 'ic_cancel.svg'
      break;

      default:
        break;
    }

    this.order?.receipts?.receiptDetails?.forEach((element: any) => {
      if(element) this.totalAmount += element?.amount;
    });
  }



}
