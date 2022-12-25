import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderStatusModalViewData } from './child-components/order-status-modal/models/order-status-modal-view-data.model';
import { OrderStatusModalComponent } from './child-components/order-status-modal/order-status-modal.component';

@Component({
  selector: 'app-personal-information-order',
  templateUrl: './personal-information-order.component.html',
  styleUrls: ['./personal-information-order.component.scss']
})
export class PersonalInformationOrderComponent implements OnInit {
  @ViewChild(OrderStatusModalComponent)
  orderStatusModal: OrderStatusModalComponent;

  showStatusWindown: Boolean = false;

  public orderStatusModalViewData$: BehaviorSubject<OrderStatusModalViewData>;

  constructor() {
    this.orderStatusModalViewData$ = new BehaviorSubject<OrderStatusModalViewData>(new OrderStatusModalViewData(''));
  }

  ngOnInit(): void {
  }

  onOpenStatusWindown(status: Number): void {
    this.orderStatusModalViewData$.next({
      ...this.orderStatusModalViewData$.getValue(),
      ...{
        orderStatus: status
      },
    });

    this.showStatusWindown = true;

  }

  onCloseStatusWindown(): void {
    this.showStatusWindown = false;

  }

}
