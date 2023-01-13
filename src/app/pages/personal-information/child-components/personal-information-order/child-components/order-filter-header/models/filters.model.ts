import { OrderStatus } from "@app/shares/base/constants/order-status.enum";

export class Filters {
  constructor(
    public searchText: string = '',
    public filterStatus: OrderStatus = OrderStatus.ALL,
  ) {}
}
