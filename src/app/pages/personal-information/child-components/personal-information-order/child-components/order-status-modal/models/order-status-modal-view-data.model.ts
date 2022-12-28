import { ViewData } from "@app/shares/base/models/view-data.model";

export class OrderStatusModalViewData extends ViewData {
  constructor(
    public orderIdentifier: string = '',
    public order: any = null
  ){
    super();
  }
}
