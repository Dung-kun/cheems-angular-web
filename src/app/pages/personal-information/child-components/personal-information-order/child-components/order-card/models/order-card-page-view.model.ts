import { PageViewModel } from "@app/shares/base/models/page-view.model";

export class OrderCardPageViewModel extends PageViewModel {
  constructor(
    public orderIdentifier: string = '',
    public order: any = null
  ){
    super();
  }
}
