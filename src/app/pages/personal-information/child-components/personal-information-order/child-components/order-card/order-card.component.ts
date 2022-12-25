import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() status: number = 0;

  public icon_link: string = '';

  constructor() { }

  ngOnInit(): void {
    switch (this.status) {
      case 1:
        this.icon_link = 'ic_transport.svg'
      break;

      case 2:
        this.icon_link = 'ic_delivery.svg'
      break;

      case 3:
        this.icon_link = 'ic_completed.svg'
      break;

      case 4:
        this.icon_link = 'ic_cancel.svg'
      break;

      default:
        break;
    }
  }



}
