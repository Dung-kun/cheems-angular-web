import { ComponentMode } from "./component-mode.enum";

export class PageViewModel {
  constructor(public componentMode: ComponentMode = ComponentMode.CreateMode) {
  }
}


