import { ViewData } from "@app/shares/base/models/view-data.model";

export class PersonalInformationAccountDisplayViewData extends ViewData {
  constructor(
    public personalIdentifier: string = '',
  ) {
    super()
  }
}
