import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderStatus } from '@app/shares/base/constants/order-status.enum';
import { PageViewModelBasedComponent } from '@app/shares/base/framework/page-view-model-based-component';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { OrderFilterHeaderPageViewModel } from './models/order-filter-header-page-view.model';
import { OrderFilterHeaderViewData } from './models/order-filter-header-view-data.model';

@Component({
  selector: 'app-order-filter-header',
  templateUrl: './order-filter-header.component.html',
  styleUrls: ['./order-filter-header.component.scss']
})
export class OrderFilterHeaderComponent extends PageViewModelBasedComponent<OrderFilterHeaderPageViewModel> implements OnInit {

  public isOpen: boolean = false;
  public selected_title: string = "Tất Cả";
  public selected: number = 0;

  constructor() {
    super();

    this.pageViewModel$ = new BehaviorSubject<OrderFilterHeaderPageViewModel>(new OrderFilterHeaderPageViewModel());
  }

  ngOnInit(): void {
    let onInit$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {
        let _viewData = viewData as OrderFilterHeaderViewData;
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          filter$: _viewData.filter$
        })
      })
    )

    let onInit = onInit$.subscribe((val) => {

    })
  }

  changeSelected(selected_index: number) {
    this.selected = selected_index;
    switch (selected_index) {
      case 0:
        this.pageViewModel$.getValue().filter$.next({
          ...this.pageViewModel$.getValue().filter$.getValue(),
          filterStatus: null
        })
        this.selected_title = "Tất Cả"
      break;

      case 1:
        this.pageViewModel$.getValue().filter$.next({
          ...this.pageViewModel$.getValue().filter$.getValue(),
          filterStatus: OrderStatus.ACCEPT
        })
        this.selected_title = "Đã xác nhận"
      break;

      case 2:
        this.pageViewModel$.getValue().filter$.next({
          ...this.pageViewModel$.getValue().filter$.getValue(),
          filterStatus: OrderStatus.PACKAGING
        })
        this.selected_title = "Đang đóng gói"
      break;

      case 3:
        this.pageViewModel$.getValue().filter$.next({
          ...this.pageViewModel$.getValue().filter$.getValue(),
          filterStatus: OrderStatus.SHIPPING
        })
        this.selected_title = "Đang giao"
      break;

      case 4:
        this.pageViewModel$.getValue().filter$.next({
          ...this.pageViewModel$.getValue().filter$.getValue(),
          filterStatus: OrderStatus.RECEIVE
        })
        this.selected_title = "Đã giao"
      break;

      case 5:
        this.pageViewModel$.getValue().filter$.next({
          ...this.pageViewModel$.getValue().filter$.getValue(),
          filterStatus: OrderStatus.DONE
        })
        this.selected_title = "Đã thanh toán"
      break;

      case 6:
        this.pageViewModel$.getValue().filter$.next({
          ...this.pageViewModel$.getValue().filter$.getValue(),
          filterStatus: OrderStatus.CANCEL
        })
        this.selected_title = "Đã huỷ"
      break;

      default:
        break;
    }

    this.isOpen = false;
  }

  toggleFilterDropdown() {
    this.isOpen = !this.isOpen;
  }
}
