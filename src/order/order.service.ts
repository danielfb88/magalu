import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'
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
      const user = new User()
      user.id = dto.userId

      const prepared = this.repository.create({
        externalId: dto.id,
        orderDate: dto.date,
        user,
      })

      const saved = await this.repository.save(prepared)

      return saved
    } catch (error) {
      console.log(error)
      // throw error
    }
  }
}
