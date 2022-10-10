export class ViewData {
  constructor() {
  }
}

export class ExtendedViewData extends ViewData {
  constructor(public id: string = null) {
    super()
  }
}
