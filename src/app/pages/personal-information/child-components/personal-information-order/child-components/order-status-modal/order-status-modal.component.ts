import { Component, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { PageViewModelBasedComponent } from '@app/shares/base/framework/page-view-model-based-component';
import { combineLatest, tap } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { OrderStatusModalPageViewModel } from './models/order-status-modal-page-view.model';
import { OrderStatusModalViewData } from './models/order-status-modal-view-data.model';

@Component({
  selector: 'app-order-status-modal',
  templateUrl: './order-status-modal.component.html',
  styleUrls: ['./order-status-modal.component.scss']
})
export class OrderStatusModalComponent extends PageViewModelBasedComponent<OrderStatusModalPageViewModel> implements OnInit {
  @ViewChild('showModal') showAgreementExtendItem: TemplateRef<any>;
  @Output() onCloseModal: EventEmitter<Boolean> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {
    const OnInit$ = combineLatest([this.items$]).pipe(
      tap((_viewData) => {
        const viewData = _viewData[0] as OrderStatusModalViewData;
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          order: viewData.order
        })

        console.log(viewData)
      })
    )

    const OnInit = OnInit$.subscribe((val) => {

    })
  }

  getCurrentStatus(status: string) {
    switch (status) {
      case "accept":
        return 1;
      break;

      case "packaging":
        return 2;
      break;

      case "shipping":
        return 3;
      break;

      case "receive":
        return 4;
      break;

      case "done":
        return 5;
      break;

      case "cancel":
        return 6;
      break;

      default:
        return 0;
        break;
    }
  }

  closeModal() {
    this.onCloseModal.emit(false);
  }

}
