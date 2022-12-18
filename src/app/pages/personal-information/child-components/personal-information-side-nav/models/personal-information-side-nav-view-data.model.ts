import { ViewData } from "@app/shares/base/models/view-data.model";

export class PersonalInformationSideNavViewData extends ViewData {
  constructor(
    public personalIdentifier: string = '',
  ) {
    super()
  }
}
