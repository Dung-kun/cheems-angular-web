import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @Input() receiptDetail: any = null;

  public productImage: string = '';
  public productName: string = '';
  public productAmount: number = 0;
  public productPrice: number = 0;
  public productCurrency: string = '';

  constructor() { }

  ngOnInit(): void {
    if(this.receiptDetail) {
      this.productImage = this.receiptDetail.products?.productTypes?.medias?.[0]?.filePath;
      this.productName = this.receiptDetail.products?.productTypes?.name;
      this.productAmount = this.receiptDetail.amount;
      this.productPrice = this.receiptDetail.price;
    }
  }

}
