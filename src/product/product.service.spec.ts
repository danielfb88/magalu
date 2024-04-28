import { Test, TestingModule } from '@nestjs/testing'
import { mockProductEntity } from './product.mock'
import { ProductRepository } from './product.repository'
import { ProductService } from './product.service'
import { productRepositoryStub } from './product.stub'

describe('ProductService', () => {
  let sut: ProductService
  let repository: ProductRepository

  const entityMock = mockProductEntity()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'PRODUCT_REPOSITORY',
          useFactory: productRepositoryStub,
        },
      ],
    }).compile()

    sut = module.get<ProductService>(ProductService)
    repository = module.get<ProductRepository>('PRODUCT_REPOSITORY')
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should save successfuly and return the saved data', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(entityMock)

    const saved = await sut.save({
      id: entityMock.externalId,
      orderId: entityMock.order.id,
      value: entityMock.value,
    })

    expect(saved).toEqual(entityMock)
  })

  it('should throw an exception if save throws', async () => {
    jest.spyOn(repository, 'save').mockImplementation(() => {
      throw new Error()
    })

    const promise = sut.save({
      id: entityMock.externalId,
      orderId: entityMock.order.id,
      value: entityMock.value,
    })

    await expect(promise).rejects.toThrow(Error)
  })

  it('should find all successfuly', async () => {
    jest.spyOn(repository, 'findAll').mockResolvedValue([])
    const list = await sut.findAll()
    expect(list).toEqual([])
  })

  it('should findByOrder successfuly', async () => {
    jest.spyOn(repository, 'findByOrder').mockResolvedValue([])
    const list = await sut.findByOrder('any-id')
    expect(list).toEqual([])
  })
})
