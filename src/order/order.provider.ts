import { DataSource } from 'typeorm'
import { OrderRepository } from './order.repository'

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      new OrderRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
]
