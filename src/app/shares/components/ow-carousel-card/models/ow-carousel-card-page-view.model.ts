import { PageViewModel } from '../../../base/models/page-view.model';
import { ProductType } from '../../../../data/models/product-type.model';

export class OwCarouselCardPageViewModel extends PageViewModel {
  constructor(
    public productTypes: ProductType[] = [],
    public itemShows: any = [],
    public lengthFollowWith: number = 4
  ){
    super();
  }
}
