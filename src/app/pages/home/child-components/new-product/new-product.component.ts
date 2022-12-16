import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { take, tap } from 'rxjs/operators';
import { PageViewModelBasedComponent } from '../../../../shares/base/framework/page-view-model-based-component';
import { NewProductViewModel } from './_models/new-product-view-model.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent extends PageViewModelBasedComponent<NewProductViewModel>  implements OnInit {

  constructor(
  ) {
    super();

    this.pageViewModel$ = new BehaviorSubject<NewProductViewModel>(new NewProductViewModel());
   }

  ngOnInit(): void {
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


}
