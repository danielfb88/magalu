import { Test, TestingModule } from '@nestjs/testing'
import { format } from 'date-fns'
import { mockOrderEntity } from './order.mock'
import { OrderRepository } from './order.repository'
import { OrderService } from './order.service'
import { orderRepositoryStub } from './order.stub'

describe('OrderService', () => {
  let sut: OrderService
  let repository: OrderRepository

  const entityMock = mockOrderEntity()

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
    repository = module.get<OrderRepository>('ORDER_REPOSITORY')
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should save successfuly and return the saved data', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(entityMock)

    const saved = await sut.save({
      id: entityMock.externalId,
      userId: entityMock.user.id,
      date: entityMock.orderDate,
    })

    expect(saved).toEqual(entityMock)
  })

  it('should throw an exception if save throws', async () => {
    jest.spyOn(repository, 'save').mockImplementation(() => {
      throw new Error()
    })

    const promise = sut.save({
      id: entityMock.externalId,
      userId: entityMock.user.id,
      date: entityMock.orderDate,
    })

    await expect(promise).rejects.toThrow(Error)
  })

  it('should find all successfuly', async () => {
    jest.spyOn(repository, 'findAll').mockResolvedValue([])
    const list = await sut.findAll()
    expect(list).toEqual([])
  })

  it('should findById successfuly', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(entityMock)
    const list = await sut.findById('any-id')
    expect(list).toEqual(entityMock)
  })

  it('should getByDate successfuly', async () => {
    jest.spyOn(repository, 'getByDate').mockResolvedValue([])
    const list = await sut.getByDate(new Date(), new Date())
    expect(list).toEqual([])
  })

  it('should format order to response successfuly', async () => {
    const order = mockOrderEntity()
    const response = await sut.formatResponse(order)

    expect(response).toEqual({
      user_id: order.user.externalId,
      name: order.user.name,
      orders: [
        {
          order_id: order.externalId,
          total: '0',
          date: format(order.orderDate, 'yyyy-MM-dd'),
          products: [],
        },
      ],
    })
  })
})
