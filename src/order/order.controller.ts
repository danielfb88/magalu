import { Controller, Get, Param } from '@nestjs/common'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':id')
  async findOne(@Param() params: any): Promise<string> {
    console.log(params.id)

    const orderList = await this.orderService.findById(params.id)

    return `This action returns a #${params.id} cat`
  }
}
