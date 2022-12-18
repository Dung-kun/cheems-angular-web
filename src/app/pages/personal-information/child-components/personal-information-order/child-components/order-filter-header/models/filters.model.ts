export class Filters {
  constructor(
    public searchText: string = '',
    public filterStatus: OrderStatus = OrderStatus.ALL,
  ) {}
}
