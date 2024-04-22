import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Order } from './order.entity'

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find()
  }
}
