import { ViewData } from '../../../shares/base/models/view-data.model';
export class ProductDetailsViewData extends ViewData {
  constructor(
    public id: string = ""
  ) {
    super()
  }
}
