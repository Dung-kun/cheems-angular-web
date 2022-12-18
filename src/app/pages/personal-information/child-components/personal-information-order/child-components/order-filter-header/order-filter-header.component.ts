import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-filter-header',
  templateUrl: './order-filter-header.component.html',
  styleUrls: ['./order-filter-header.component.scss']
})
export class OrderFilterHeaderComponent implements OnInit {

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
        this.selected_title = "Tất Cả"
      break;

      case 1:
        this.selected_title = "Vận chuyển"
      break;

      case 2:
        this.selected_title = "Đang giao"
      break;

      case 3:

        this.selected_title = "Hoàn thành"
      break;

      case 4:
        this.selected_title = "Đã huỷ"
      break;

      case 5:
        this.selected_title = "Trả hàng"
      break;

      default:
        break;
    }
  }

  toggleFilterDropdown() {
    this.isOpen = !this.isOpen;
  }
}
