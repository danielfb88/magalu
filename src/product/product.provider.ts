import { DataSource } from 'typeorm'
import { ProductRepository } from './product.repository'

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      new ProductRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
]
