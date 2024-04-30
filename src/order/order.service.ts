import { Inject, Injectable } from '@nestjs/common'
import { format } from 'date-fns'
import { IResponse } from '../shared/interface/response.interface'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './order.entity'
import { OrderRepository } from './order.repository'

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private repository: OrderRepository,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.repository.findAll()
  }

  async save(dto: CreateOrderDto): Promise<Order> {
    const saved = await this.repository.save(dto)
    return saved
  }

  async findById(id: string): Promise<Order> {
    const result = await this.repository.findById(id)
    return result
  }

  async findByExternalId(externalId: number): Promise<Order> {
    return this.repository.findByExternalId(externalId)
  }

  async getByDate(startDate: Date, endDate: Date): Promise<Order[]> {
    const result = await this.repository.getByDate(startDate, endDate)
    return result
  }

  async formatResponse(order: Order): Promise<IResponse> {
    let total = 0
    const products = (await order.products).map((prod) => {
      total += prod.value
      return {
        product_id: prod.externalId,
        value: `${prod.value}`,
      }
    })

    const response: IResponse = {
      user_id: order.user.externalId,
      name: order.user.name,
      orders: [
        {
          order_id: order.externalId,
          total: `${total}`,
          date: format(order.orderDate, 'yyyy-MM-dd'),
          products,
        },
      ],
    }

    return response
  }
}
