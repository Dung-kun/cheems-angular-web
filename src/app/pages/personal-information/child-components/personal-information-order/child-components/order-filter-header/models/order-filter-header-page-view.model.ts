import { PageViewModel } from "@app/shares/base/models/page-view.model";
import { BehaviorSubject } from "rxjs";
import { Filters } from "./filters.model";

export class OrderFilterHeaderPageViewModel extends PageViewModel {
  constructor(
    public filter$: BehaviorSubject<Filters> = null,
  ){
    super();
  }
}
