import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { OrderController } from './order.controller'
import { orderProviders } from './order.provider'
import { OrderService } from './order.service'

@Module({
  imports: [DatabaseModule],
  providers: [...orderProviders, OrderService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
