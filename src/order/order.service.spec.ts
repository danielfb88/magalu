import { Test, TestingModule } from '@nestjs/testing'
import { OrderService } from './order.service'
import { orderRepositoryStub } from './order.stub'

describe('OrderService', () => {
  let sut: OrderService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'ORDER_REPOSITORY',
          useFactory: orderRepositoryStub,
        },
      ],
    }).compile()

    sut = module.get<OrderService>(OrderService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
})
