import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common'
import { IResponse } from '../shared/interface/response.interface'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<IResponse> {
    const order = await this.orderService.findById(params.id)

    if (order) {
      return this.orderService.formatResponse(order)
    } else {
      throw new NotFoundException('Pedido não encontrado.')
    }
  }

  @Get()
  async findByDate(
    @Query('startDate') startDate,
    @Query('endDate') endDate,
  ): Promise<IResponse[]> {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const orderList = await this.orderService.getByDate(start, end)

    const resultList = []
    for (const order of orderList) {
      const formatted = await this.orderService.formatResponse(order)
      resultList.push(formatted)
    }

    return resultList
  }
}
