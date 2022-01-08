import { OrderEnum } from './enums/order.enum';

export interface NavModel {
  label: string
  href: string
  queryParams?: {
    order: OrderEnum
  }
}
