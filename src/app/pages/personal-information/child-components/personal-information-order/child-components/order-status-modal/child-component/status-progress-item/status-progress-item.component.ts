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
        if(progress == 'pending') this.label = "Đang chấp nhận"
        else if(progress == 'finish') this.label = "Đã chấp nhận"
        else this.label = "chấp nhận"
      break;

      case 2:
        if(progress == 'pending') this.label = "Đang đóng gói"
        else if(progress == 'finish') this.label = "Đã đã đóng gói"
        else this.label = "đóng gói"
      break;

      case 3:
        if(progress == 'pending') this.label = "Đang chuyển"
        else if(progress == 'finish') this.label = "Đã chuyển"
        else this.label = "Vận chuyển"
      break;

      case 4:
        if(progress == 'pending') this.label = "Đang Nhận"
        else if(progress == 'finish') this.label = "Đã nhận"
        else this.label = "Nhận hàng"
      break;

      case 5:
        this.label = "Hoàn Thành"
        this.statusString = "finish";
        this.statusIcon = "ic_tick.svg"
      break;

      case 6:
        this.label = "Đã huỷ"
        this.statusString = "cancel";
      break;

      default:
        break;
    }
  }

}
