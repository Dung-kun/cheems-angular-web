import { ProductType } from './product-type.model';
export class CartItem {
  constructor(
    public id: string = "",
    public amount: number = null,
    public productTypes: ProductType = null,
    public cardsId: string = "",
    public productTypesId: string = ""
  ){}
}
