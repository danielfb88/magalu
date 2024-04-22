import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Order } from '../order/order.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './product.entity'

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private repository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.repository.find()
  }

  async findByOrder(orderId: string): Promise<Product[]> {
    try {
      const result = await this.repository
        .createQueryBuilder('product')
        .where('product.orderId = :orderId')
        .orderBy('product.value', 'ASC')
        .setParameters({ orderId })
        .getMany()

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async save(dto: CreateProductDto): Promise<Product> {
    try {
      const order = new Order()
      order.id = dto.orderId

      const prepared = this.repository.create({
        externalId: dto.id,
        value: dto.value,
        order,
      })

      const saved = await this.repository.save(prepared)

      return saved
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
