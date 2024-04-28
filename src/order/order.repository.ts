import { Inject, Injectable } from '@nestjs/common'
import { Between, DataSource, Repository } from 'typeorm'
import { User } from '../user/user.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './order.entity'

@Injectable()
export class OrderRepository {
  private baseRepository: Repository<Order>

  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.baseRepository = dataSource.getRepository(Order)
  }

  async findAll(): Promise<Order[]> {
    return this.baseRepository.find()
  }

  async save(dto: CreateOrderDto): Promise<Order> {
    try {
      const user = new User()
      user.id = dto.userId

      const prepared = this.baseRepository.create({
        externalId: dto.id,
        orderDate: dto.date,
        user,
      })

      const saved = await this.baseRepository.save(prepared)

      return saved
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findById(id: string): Promise<Order> {
    try {
      const result = await this.baseRepository.findOne({
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
      const result = await this.baseRepository.find({
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
}
