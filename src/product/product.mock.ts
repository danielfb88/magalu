import { Order } from '../order/order.entity'
import { Product } from './product.entity'

export const mockProductEntity = (): Product => {
  return {
    id: 'any-id',
    value: 1,
    externalId: 1,
    order: new Order(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
