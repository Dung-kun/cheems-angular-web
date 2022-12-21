import { PageViewModel } from '../../../shares/base/models/page-view.model';
import { User } from '../../../data/models/user.model';
export class HeaderPageViewModel extends PageViewModel {
  constructor(
    public user: User = new User(),
  ){
    super();
  }
}
