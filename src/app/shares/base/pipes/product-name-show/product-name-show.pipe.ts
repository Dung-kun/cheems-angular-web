import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '../../../../data/models/product-type.model';

@Pipe({
  name: 'productNameShowPipe',
})
export class ProductNameShowPipe implements PipeTransform {
  transform(value: ProductType, isDetails: boolean): string {
    const metadata = value?.metaDatas;
    let temp = !!value
      ? `${value.name} ${metadata?.seriesName || ""} (${
          metadata?.cPUSeries ? metadata.cPUSeries + '/' : ''
        }${metadata?.ram? "RAM"+metadata.ram +"/":""}${metadata?.hardDrive? metadata.hardDrive : ''})`
      : 'Sản phẩm chưa có tên';
    if(temp.length > 50 && !isDetails) {
      temp = temp.slice(0,50)+"...";
    }
    return temp;
  }
}
