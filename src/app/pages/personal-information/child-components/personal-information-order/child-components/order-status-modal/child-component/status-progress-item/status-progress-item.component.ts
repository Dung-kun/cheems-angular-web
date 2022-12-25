import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-progress-item',
  templateUrl: './status-progress-item.component.html',
  styleUrls: ['./status-progress-item.component.scss']
})
export class StatusProgressItemComponent implements OnInit {

  @Input() currentStatus: Number;
  @Input() statusNumber: Number;

  public statusString: string = '';
  public label: string = '';
  public statusIcon: string = '';

  constructor() { }

  ngOnInit(): void {
    if(this.currentStatus == this.statusNumber) {
      this.statusString = "pending";
      this.setStatus(this.statusNumber,  "pending");
      this.statusIcon = "ic_pending.svg"
    }
    else if(this.currentStatus > this.statusNumber) {
      this.statusString = "finish";
      this.setStatus(this.statusNumber,  "finish");
      this.statusIcon = "ic_tick.svg"
    }
    else {
      this.statusString = "not-yet"
      this.setStatus(this.statusNumber,  "not-yet");
      this.statusIcon = "ic_dot.svg"
    }
  }

  setStatus(status: Number, progress: string) {
    switch (status) {
      case 1:
        if(progress == 'pending') this.label = "Đang chuyển"
        else if(progress == 'finish') this.label = "Đã chuyển"
        else this.label = "Vận chuyển"
      break;

      case 2:
        if(progress == 'pending') this.label = "Đang giao"
        else if(progress == 'finish') this.label = "Đã giao"
        else this.label = "giao hàng"
      break;

      case 3:
        this.label = "Hoàn Thành"
      break;

      case 3:
        this.label = "Đã huỷ"
      break;

      default:
        break;
    }
  }

}
