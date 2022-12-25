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
          orderStatus: viewData.orderStatus
        })

        console.log(viewData)
      })
    )

    const OnInit = OnInit$.subscribe((val) => {

    })
  }

  closeModal() {
    this.onCloseModal.emit(false);
  }

}
