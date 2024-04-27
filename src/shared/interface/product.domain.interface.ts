import { IOrderDomain } from './order.domain.interface'

export interface IProductDomain {
  id: string
  externalId: number
  order: IOrderDomain
  value: number
}
