import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ChildViewManagement } from '../../base/framework/child-view.management';

@Component({
  selector: 'app-ow-carousel-card',
  templateUrl: './ow-carousel-card.component.html',
  styleUrls: ['./ow-carousel-card.component.scss']
})
export class OwCarouselCardComponent extends ChildViewManagement implements OnInit {
  importedItems: any = [];
  showItems: any = [];


  constructor() {
    super();
  }

  get width() {
    return window.innerWidth;
  }

  get productAmountShow() {
    if (this.width < 576) {
      return 1;
    } else if (this.width >= 576 && this.width < 768) {
      return 2;
    } else if (this.width >= 768 && this.width < 992) {
      return 3;
    } else if (this.width >= 992 && this.width < 1200) {
      return 4;
    } else if (this.width >= 1200 && this.width < 1600) {
      return 5;
    } else {
      return 6;
    }
  }

  get productListShow() {
    if(!this.importedItems) {
      return [];
    }
    for(let i = 0; i < this.importedItems.length; i += this.productAmountShow) {
      let temp = [];
      for(let j = i; j < this.productAmountShow + i; j++) {
        temp.push(this.importedItems[i])
      }
      this.showItems.push(temp);
    }

    return this.showItems;
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]).subscribe((value) => {
      this.importedItems = value;
    });

    this.subscriptions$.push(onInit$);

    for(let i = 0; i < this.importedItems.length; i += this.productAmountShow) {
      let temp = [];
      for(let j = i; j < this.productAmountShow + i; j++) {
        temp.push(this.importedItems[i])
      }
      this.showItems.push(temp);
    }
  }



}
