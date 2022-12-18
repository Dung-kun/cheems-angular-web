import { PersonalInformation } from "@app/pages/personal-information/models/personal-information.model";
import { PageViewModel } from "@app/shares/base/models/page-view.model";

export class PersonalInformationAccountDisplayPageViewModel extends PageViewModel {
  constructor(
    public personalIdentifier: string = '',
    public personalInformation: PersonalInformation = null,
  ){
    super();
  }
}
