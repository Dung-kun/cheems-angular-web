import { PageViewModel } from '../../../shares/base/models/page-view.model';
import { ProductType } from '../../../data/models/product-type.model';
import { PersonalInformation } from './personal-information.model';
export class PersonalInformationPageViewModel extends PageViewModel {
  constructor(
    public personalIdentifier: string = '',
    public personalInformation: PersonalInformation = null
  ){
    super();
  }
}
