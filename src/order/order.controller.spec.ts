import { Test, TestingModule } from '@nestjs/testing'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { orderServiceStub } from './order.stub'

describe('OrderController', () => {
  let sut: OrderController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderController,
        {
          provide: OrderService,
          useFactory: orderServiceStub,
        },
      ],
    }).compile()

    sut = module.get<OrderController>(OrderController)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
})
