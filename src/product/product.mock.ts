import { mockOrderEntity } from '../order/order.mock'
import { Product } from './product.entity'

export const mockProductEntity = (): Product => {
  return {
    id: 'any-id',
    value: 1,
    externalId: 1,
    order: mockOrderEntity(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
