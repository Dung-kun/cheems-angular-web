import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-filter-header',
  templateUrl: './order-filter-header.component.html',
  styleUrls: ['./order-filter-header.component.scss']
})
export class OrderFilterHeaderComponent implements OnInit {
  @Output() onFilterChange: EventEmitter<string>;

  public isOpen: boolean = false;
  public selected_title: string = "Tất Cả";
  public selected: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeSelected(selected_index: number) {
    this.selected = selected_index;
    switch (selected_index) {
      case 0:
        this.onFilterChange.emit(null);
        this.selected_title = "Tất Cả"
      break;

      case 1:
        this.onFilterChange.emit("accept");
        this.selected_title = "Đã xác nhận"
      break;

      case 2:
        this.onFilterChange.emit("packaging");
        this.selected_title = "Đang đóng gói"
      break;

      case 3:
        this.onFilterChange.emit("shipping");
        this.selected_title = "Đang giao"
      break;

      case 4:
        this.onFilterChange.emit("receive");
        this.selected_title = "Đã giao"
      break;

      case 5:
        this.onFilterChange.emit("done");
        this.selected_title = "Đã thanh toán"
      break;

      case 6:
        this.onFilterChange.emit("cancel");
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
