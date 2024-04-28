import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { format } from 'date-fns'
import { OrderController } from './order.controller'
import { mockOrderEntity } from './order.mock'
import { OrderService } from './order.service'
import { orderServiceStub } from './order.stub'

describe('OrderController', () => {
  let sut: OrderController
  let service: OrderService

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
    service = module.get<OrderService>(OrderService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should findOne order successfuly', async () => {
    const orderMock = mockOrderEntity()
    const responseMock = {
      user_id: orderMock.user.externalId,
      name: orderMock.user.name,
      orders: [
        {
          order_id: orderMock.externalId,
          total: '0',
          date: format(orderMock.orderDate, 'yyyy-MM-dd'),
          products: [],
        },
      ],
    }

    jest.spyOn(service, 'findById').mockResolvedValue(orderMock)
    jest.spyOn(service, 'formatResponse').mockResolvedValue(responseMock)

    const order = await sut.findOne({ id: 'any-id' })

    expect(order).toEqual(responseMock)
  })

  it('should throw NotFoundException if order is not found', async () => {
    jest.spyOn(service, 'findById').mockResolvedValue(undefined)
    const promise = sut.findOne({ id: 'any-id' })
    await expect(promise).rejects.toThrow(NotFoundException)
  })

  it('should findByDate successfuly', async () => {
    const orderMock = mockOrderEntity()
    const responseMock = {
      user_id: orderMock.user.externalId,
      name: orderMock.user.name,
      orders: [
        {
          order_id: orderMock.externalId,
          total: '0',
          date: format(orderMock.orderDate, 'yyyy-MM-dd'),
          products: [],
        },
      ],
    }

    jest.spyOn(service, 'getByDate').mockResolvedValue([orderMock])
    jest.spyOn(service, 'formatResponse').mockResolvedValue(responseMock)

    const order = await sut.findByDate(new Date(), new Date())

    expect(order).toEqual([responseMock])
  })
})
