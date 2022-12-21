import { PageViewModel } from '../../../../../shares/base/models/page-view.model';
import { Manufacturer } from '../../../../../data/models/manufacturer.model';


export class HotTrademarkPageViewModel extends PageViewModel {
  constructor(
    public manufacturers: Manufacturer[] = []
  ){
    super();
  }
}
