import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './order.entity'

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private repository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.repository.find()
  }

  async save(dto: CreateOrderDto): Promise<Order> {
    try {
      const saved = this.repository.save({
        externalId: dto.id,
        date: dto.date,
      })

      return saved
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
