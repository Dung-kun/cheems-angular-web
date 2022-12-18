import { ViewData } from "@app/shares/base/models/view-data.model";
import { BehaviorSubject } from "rxjs";
import { Filters } from "./filters.model";

export class OrderFilterHeaderViewData extends ViewData {
  constructor(
    public filter$: BehaviorSubject<Filters> = null,
  ) {
    super()
  }
}
