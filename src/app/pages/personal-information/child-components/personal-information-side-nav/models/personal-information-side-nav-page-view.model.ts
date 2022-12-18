import { PageViewModel } from "@app/shares/base/models/page-view.model";

export class PersonalInformationSideNavPageViewModel extends PageViewModel {
  constructor(
    public personalIdentifier: string = '',
  ){
    super();
  }
}
