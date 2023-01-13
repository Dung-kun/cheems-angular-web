import { Component, HostListener, OnInit, Input } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ChildViewManagement } from '../../base/framework/child-view.management';
import { OwCarouselCardViewData } from './models/ow-carousel-card-view-data.model';
import { ProductType } from '../../../data/models/product-type.model';
import { PageViewModelBasedComponent } from '../../base/framework/page-view-model-based-component';
import { OwCarouselCardPageViewModel } from './models/ow-carousel-card-page-view.model';
import { PropertyCardViewData } from '../property-card/models/property-card-view-data.model';

@Component({
  selector: 'app-ow-carousel-card',
  templateUrl: './ow-carousel-card.component.html',
  styleUrls: ['./ow-carousel-card.component.scss']
})
export class OwCarouselCardComponent extends PageViewModelBasedComponent<OwCarouselCardPageViewModel> implements OnInit {
  @Input() carouselsId: string = "carouselsIdX";
  importedItems: ProductType[] = [];
  showItems: any = [];
  length: number = 4;

  constructor() {
    super();
    this.pageViewModel$ = new BehaviorSubject<OwCarouselCardPageViewModel>(new OwCarouselCardPageViewModel());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    let length = this.productAmountShow(width);

    this.pageViewModel$.next({
      ...this.pageViewModel$.getValue(),
      ... {
        lengthFollowWith: length,
        itemShows: this.productListShow(length)
      }
    })
  }


  productAmountShow(width: number) {
    if (width < 576) {
      return 2;
    } else if (width >= 576 && width < 768) {
      return 3;
    } else if (width >= 768 && width < 992) {
      return 3;
    } else if (width >= 992 && width < 1200) {
      return 4;
    } else if (width >= 1200 && width < 1600) {
      return 5;
    } else {
      return 6;
    }
  }

  productListShow(length: number) {
    let swItem = [];
    let productTypes = this.pageViewModel$.getValue().productTypes || [];

    for(let i = 0; i < productTypes.length; i += length) {
      let temp = [];
      for(let j = i; j < length + i && j < productTypes.length; j++) {
        temp.push(productTypes[j])
      }

      swItem.push(temp);
    }

    return swItem;
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]);


    const onInit = onInit$.subscribe(([value]) => {
      const _value = value as OwCarouselCardViewData;

      const width = window.innerWidth;
      let productTypes =  _value.productTypes;
      let itemShows = [];
      let length = this.pageViewModel$.getValue().lengthFollowWith;


      for(let i = 0; i < productTypes.length; i += length) {
        let temp = [];
        for(let j = i; j < length + i && j < productTypes.length; j++) {
          temp.push(productTypes[j])
        }
        itemShows.push(temp);
      }


      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        itemShows,
        productTypes,
        lengthFollowWith: this.productAmountShow(width)
      });

    });

    this.subscriptions$.push(onInit);
  }


  onPropertyCardViewData(productType: ProductType) {
    const propertyCardViewData$ = new BehaviorSubject<PropertyCardViewData>(new PropertyCardViewData(productType));
    return propertyCardViewData$;
  }
}
