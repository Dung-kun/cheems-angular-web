import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ChildViewManagement } from '../../base/framework/child-view.management';
import { OwCarouselCardViewData } from './models/ow-carousel-card-view-data.model';
import { ProductType } from '../../../data/models/product-type.model';

@Component({
  selector: 'app-ow-carousel-card',
  templateUrl: './ow-carousel-card.component.html',
  styleUrls: ['./ow-carousel-card.component.scss']
})
export class OwCarouselCardComponent extends ChildViewManagement implements OnInit {
  importedItems: ProductType[] = [];
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
      return 4;
    } else {
      return 6;
    }
  }

  get productListShow() {

    console.log('length',this.productAmountShow);
    let length = this.productAmountShow;
    let showItems = [];
    if(!this.importedItems) {
      return [];
    }
    for(let i = 0; i < this.importedItems.length; i += length) {
      let temp = [];
      for(let j = i; j < length + i && j < this.importedItems.length; j++) {
        temp.push(this.importedItems[j])
      }

      showItems.push(temp);
      console.log('cc', i, showItems);
    }

    return showItems;
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]).subscribe(([value]) => {
      console.log('value', value);
      const _value = value as OwCarouselCardViewData;
      this.importedItems =  _value.productTypes;
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
