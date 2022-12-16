import { Component, OnInit } from '@angular/core';
import { ChildViewManagement } from '../../../../shares/base/framework/child-view.management';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-product-introduction',
  templateUrl: './product-introduction.component.html',
  styleUrls: ['./product-introduction.component.scss']
})
export class ProductIntroductionComponent extends ChildViewManagement implements OnInit {

  constructor() {
    super();
   }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]).pipe(

    )
  }

}
