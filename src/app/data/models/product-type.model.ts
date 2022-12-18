import { Category } from "./category.model";
import { Media } from './media.model';
import { Metadata } from "./metadata.model";

export class ProductType {
  constructor(
    public id: string = "",
    public categories: Category[] = [],
    public name: string = "",
    public price: number = null,
    public description: string = "",
    public medias: Media[] = [],
    public warrentyDate: Date = null,
    public metaDatas: Metadata = null,
  ){

  }
}

