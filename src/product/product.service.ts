import { Inject, Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './product.entity'
import { ProductRepository } from './product.repository'

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private repository: ProductRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.repository.findAll()
  }

  async findByOrder(orderId: string): Promise<Product[]> {
    const result = await this.repository.findByOrder(orderId)
    return result
  }

  async save(dto: CreateProductDto): Promise<Product> {
    const saved = await this.repository.save(dto)
    return saved
  }
}
