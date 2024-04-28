import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { repositoryStub } from '../shared/test/repository.stub'
import { Product } from './product.entity'
import { mockProductEntity } from './product.mock'
import { ProductService } from './product.service'

describe('ProductService', () => {
  let sut: ProductService
  let repository: Repository<Product>
  const entityMock = mockProductEntity()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'PRODUCT_REPOSITORY',
          useFactory: repositoryStub,
        },
      ],
    }).compile()

    sut = module.get<ProductService>(ProductService)
    repository = module.get<Repository<Product>>('PRODUCT_REPOSITORY')
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
    jest.spyOn(repository, 'find').mockResolvedValue([])

    const list = await sut.findAll()

    expect(list).toEqual([])
  })

  it('should findByOrder successfuly', async () => {
    const list = await sut.findByOrder('any-id')

    expect(list).toEqual([])
  })
})
