import { Test, TestingModule } from '@nestjs/testing'
import { ProductService } from './product.service'
import { productRepositoryStub } from './product.stub'

describe('ProductService', () => {
  let sut: ProductService

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
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
})
