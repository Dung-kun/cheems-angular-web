import { Category } from "./category.model";
import { Media } from './media.model';
import { Metadata } from "./metadata.model";

export class ProductType {
  constructor(
    public id: string = "",
    public categories: Category[] = [],
    public name: string = "",
    public price: string = "",
    public description: string = "",
    public medias: Media[] = [],
    public warrantyDate: Date = null,
    public metaData: Metadata = null,
  ){

  }
}
