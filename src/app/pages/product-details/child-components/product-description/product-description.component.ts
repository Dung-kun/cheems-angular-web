import { Component, OnInit } from '@angular/core';
import { ChildViewManagement } from '../../../../shares/base/framework/child-view.management';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent extends ChildViewManagement implements OnInit {

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}
