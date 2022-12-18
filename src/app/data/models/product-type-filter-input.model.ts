import { MetadataFilter } from "./metadata-filter.model";

export class ProductTypeFilterInput {
  constructor(
    public ids: string[] = null,
    public categoriesIds: string[] = [],
    public names: string[] = [],
    public priceTo: number = null,
    public priceFrom: number = null,
    public descriptions: string[] = [],
    public warrentyDateFrom: Date = null,
    public warrentyDateTo: Date = null,
    public metaDatas: MetadataFilter = new MetadataFilter(),
    public isDeleted: boolean = false
  ){}
}
