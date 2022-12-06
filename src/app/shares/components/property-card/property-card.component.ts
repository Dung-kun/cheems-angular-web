import { Component, Input, OnInit } from '@angular/core';
import { ProductType } from '../../../data/models/product-type.model';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() product: ProductType;

  constructor() { }

  ngOnInit(): void {
  }

}
