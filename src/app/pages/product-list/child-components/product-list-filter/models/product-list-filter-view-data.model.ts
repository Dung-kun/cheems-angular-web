import { ViewData } from '../../../../../shares/base/models/view-data.model';
import { BehaviorSubject } from 'rxjs';
import { FilterProductModel } from '../../../models/filer-product.model';


export class ProductListFilterViewData extends ViewData {
  constructor(
    public filterInput: BehaviorSubject<FilterProductModel> = null
  ){
    super();
  }
}
