import { PageViewModel } from '../../../../../shares/base/models/page-view.model';
import { Manufacturer } from '../../../../../data/models/manufacturer.model';
import { Category } from '../../../../../data/models/category.model';
import { BehaviorSubject } from 'rxjs';
import { FilterProductModel } from '../../../models/filer-product.model';
export class ProductListFilterPageViewModel extends PageViewModel {
  constructor(
    public filter$: BehaviorSubject<FilterProductModel> = null,
    public categories: Category[] = [],
    public manufacturers: Manufacturer[] = []
  ){
    super()
  }
}
