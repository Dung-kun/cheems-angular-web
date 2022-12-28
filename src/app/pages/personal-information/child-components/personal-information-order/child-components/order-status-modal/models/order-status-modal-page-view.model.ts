import { PageViewModel } from "@app/shares/base/models/page-view.model";

export class OrderStatusModalPageViewModel extends PageViewModel {
  constructor(
    public orderIdentifier: string = '',
    public order: any = null
  ){
    super()
  }
}
