import { Inject, Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Order } from '../order/order.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './product.entity'

@Injectable()
export class ProductRepository {
  private baseRepository: Repository<Product>

  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.baseRepository = dataSource.getRepository(Product)
  }

  async findAll(): Promise<Product[]> {
    return this.baseRepository.find()
  }

  async findByOrder(orderId: string): Promise<Product[]> {
    try {
      const result = await this.baseRepository
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

  async findByExternalId(externalId: number): Promise<Product> {
    try {
      return this.baseRepository.findOne({
        relations: {
          order: true,
        },
        where: {
          externalId,
        },
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async save(dto: CreateProductDto): Promise<Product> {
    try {
      const order = new Order()
      order.id = dto.orderId

      const prepared = this.baseRepository.create({
        externalId: dto.id,
        value: dto.value,
        order,
      })

      const saved = await this.baseRepository.save(prepared)

      return saved
    } catch (error) {
      console.log(error)
      // throw error
    }
  }
}
