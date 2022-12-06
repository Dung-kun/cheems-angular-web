import { Manufacturer } from "./manufacturer.model";
import { ProductType } from './product-type.model';

export class Product {
    constructor(
      public id: string = "",
      public name: string = "",
      public productTypes: ProductType[] = [],
      public deletedAt: string = "",
      public manufacturers: Manufacturer[] = []
    ){
    }
}
