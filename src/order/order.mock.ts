import { mockUserEntity } from '../user/user.mock'
import { Order } from './order.entity'

export const mockOrderEntity = (): Order => {
  return {
    id: 'any-id',
    externalId: 1,
    orderDate: new Date(),
    user: mockUserEntity(),
    products: new Promise((resolve) => {
      resolve([])
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
