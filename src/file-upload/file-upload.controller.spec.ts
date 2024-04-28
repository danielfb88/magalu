import { Test, TestingModule } from '@nestjs/testing'
import { OrderService } from '../order/order.service'
import { orderServiceStub } from '../order/order.stub'
import { ProductService } from '../product/product.service'
import { productServiceStub } from '../product/product.stub'
import { UserService } from '../user/user.service'
import { userServiceStub } from '../user/user.stub'
import { FileUploadController } from './file-upload.controller'
import { FileUploadService } from './file-upload.service'
import { fileUploadServiceStub } from './file-upload.stub'

describe('FileUploadController', () => {
  let sut: FileUploadController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileUploadController,
        {
          provide: FileUploadService,
          useFactory: fileUploadServiceStub,
        },
        {
          provide: UserService,
          useFactory: userServiceStub,
        },
        {
          provide: OrderService,
          useFactory: orderServiceStub,
        },
        {
          provide: ProductService,
          useFactory: productServiceStub,
        },
      ],
    }).compile()

    sut = module.get<FileUploadController>(FileUploadController)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
})
