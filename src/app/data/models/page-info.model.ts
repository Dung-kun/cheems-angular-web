export class PageInfo {
  constructor(
    public startCursor: string = "",
    public endCursor: string = "",
    public hasNextPage: boolean = false,
    public hasPreviousPage: boolean = false
  ){
  }
}
