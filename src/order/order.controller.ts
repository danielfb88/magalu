import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { IResponse } from '../shared/interface/response.interface'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':id')
  async findOne(@Param() params: any): Promise<IResponse> {
    console.log(params.id)

    const order = await this.orderService.findById(params.id)

    if (order) {
      return this.orderService.formatResponse(order)
    } else {
      throw new NotFoundException('Pedido não encontrado.')
    }
  }
}