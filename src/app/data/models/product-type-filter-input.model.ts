import { MetadataFilter } from "./metadata-filter.model";

export class ProductTypeFilterInput {
  constructor(
    public ids: string[] = [],
    public categoriesIds: string[] = [],
    public names: string[] = [],
    public priceTo: number = null,
    public priceFrom: number = null,
    public descriptions: string[] = [],
    public warrentyPeriodFrom: number = null,
    public warrentyPeriodTo: number = null,
    public metaDatas: MetadataFilter = new MetadataFilter(),
    public isDeleted: boolean = false
  ){}
}
