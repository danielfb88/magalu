import { Inject, Injectable } from '@nestjs/common'
import { format } from 'date-fns'
import { Between, Repository } from 'typeorm'
import { IResponse } from '../shared/interface/response.interface'
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
      throw error
    }
  }

  async findById(id: string): Promise<Order> {
    try {
      const result = await this.repository.findOne({
        relations: {
          user: true,
          products: true,
        },
        where: {
          id,
        },
      })

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getByDate(startDate: Date, endDate: Date): Promise<Order[]> {
    try {
      const result = await this.repository.find({
        relations: {
          user: true,
          products: true,
        },
        where: {
          orderDate: Between(startDate, endDate),
        },
        order: {
          orderDate: 'ASC',
        },
      })

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
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
