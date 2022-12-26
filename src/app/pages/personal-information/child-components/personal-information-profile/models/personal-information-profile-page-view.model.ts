import { Media } from "@app/data/models/media.model";
import { FormViewPageViewModel } from "@app/shares/base/models/form-view-page-view-model.model";

export class PersonalInformationProfilePageViewModel extends FormViewPageViewModel {
  constructor(
    public personalIdentifier: string = '',
    public avatar: Media[] = [],
  ){
    super();
  }
}
