import { IProductDomain } from './product.domain.interface'
import { IUserDomain } from './user.domain.interface'

export interface IOrderDomain {
  id: string
  externalId: number
  user: IUserDomain
  products: Promise<Partial<IProductDomain[]>>
  orderDate: Date
}
