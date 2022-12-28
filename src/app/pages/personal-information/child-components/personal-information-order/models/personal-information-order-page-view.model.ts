import { Media } from "@app/data/models/media.model";
import { FormViewPageViewModel } from "@app/shares/base/models/form-view-page-view-model.model";

export class PersonalInformationOrderPageViewModel extends FormViewPageViewModel {
  constructor(
    public personalIdentifier: string = '',
    public orders: any[] = [],
  ){
    super();
  }
}
