import { Category } from "./category.model";
import { Media } from './media.model';
import { Metadata } from "./metadata.model";
import { Tag } from "./tag.model";

export class ProductType {
  constructor(
    public id: string = "",
    public categories: Category[] = [],
    public name: string = "",
    public price: number = null,
    public description: string = "",
    public medias: Media[] = [],
    public warrantyPeriod: number = null,
    public metaDatas: Metadata = null,
    public tags: Tag[] = []
  ){

  }
}

