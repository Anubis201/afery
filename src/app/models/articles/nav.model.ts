import { OrderEnum } from './enums/order.enum';

export interface NavModel {
  label: string
  href: string
  isActive: boolean
  queryParams?: {
    order: OrderEnum
  }
}
