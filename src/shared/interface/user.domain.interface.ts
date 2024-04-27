import { IOrderDomain } from './order.domain.interface'

export interface IUserDomain {
  id: string
  externalId: number
  name: string
  orders: Promise<Partial<IOrderDomain[]>>
}
