import { Test, TestingModule } from '@nestjs/testing'
import { mockOrderEntity } from '../order/order.mock'
import { OrderService } from '../order/order.service'
import { orderServiceStub } from '../order/order.stub'
import { mockProductEntity } from '../product/product.mock'
import { ProductService } from '../product/product.service'
import { productServiceStub } from '../product/product.stub'
import { IRow } from '../shared/interface/row.interface'
import { ISortedOrder } from '../shared/interface/sorted-order.interface'
import { ISortedUser } from '../shared/interface/sorted-user.interface'
import { mockUserEntity } from '../user/user.mock'
import { UserService } from '../user/user.service'
import { userServiceStub } from '../user/user.stub'
import { FileUploadController } from './file-upload.controller'
import { FileUploadService } from './file-upload.service'
import { fileUploadServiceStub } from './file-upload.stub'

describe('FileUploadController', () => {
  let sut: FileUploadController
  let fileUploadService: FileUploadService
  let userService: UserService
  let orderService: OrderService
  let productService: ProductService

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
    fileUploadService = module.get<FileUploadService>(FileUploadService)
    userService = module.get<UserService>(UserService)
    orderService = module.get<OrderService>(OrderService)
    productService = module.get<ProductService>(ProductService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should uploadFile successfuly', async () => {
    const rowList: IRow[] = [
      {
        userId: '1',
        orderId: '1',
        prodId: '1',
        userName: 'Seu Madruga',
        date: '19880208',
        value: '1',
      },
    ]

    const sortedUsersList: ISortedUser[] = [
      {
        id: 1,
        name: 'Seu Madruga',
      },
    ]

    const sortedOrdersList: ISortedOrder[] = [
      {
        orderId: 1,
        userId: 1,
        date: '19880208',
      },
    ]

    jest
      .spyOn(fileUploadService, 'createReadStream')
      .mockReturnValue('' as any)
    jest.spyOn(fileUploadService, 'streamToString').mockResolvedValue('')
    jest
      .spyOn(fileUploadService, 'mapStringToFields')
      .mockReturnValue(rowList)
    jest
      .spyOn(fileUploadService, 'getSortedUsers')
      .mockReturnValue(sortedUsersList)
    jest
      .spyOn(fileUploadService, 'getSortedOrders')
      .mockReturnValue(sortedOrdersList)
    jest.spyOn(userService, 'save').mockResolvedValue(mockUserEntity())
    jest.spyOn(orderService, 'save').mockResolvedValue(mockOrderEntity())
    jest
      .spyOn(productService, 'save')
      .mockResolvedValue(mockProductEntity())
    jest
      .spyOn(fileUploadService, 'formatResponse')
      .mockReturnValue({} as any)

    const result = await sut.uploadFile({ path: 'any-value' } as any)

    expect(result).toEqual({})
  })

  it('should uploadFile with duplicated user successfuly', async () => {
    const rowList: IRow[] = [
      {
        userId: '1',
        orderId: '1',
        prodId: '1',
        userName: 'Seu Madruga',
        date: '19880208',
        value: '1',
      },
    ]

    const sortedUsersList: ISortedUser[] = [
      {
        id: 1,
        name: 'Seu Madruga',
      },
    ]

    const sortedOrdersList: ISortedOrder[] = [
      {
        orderId: 1,
        userId: 1,
        date: '19880208',
      },
    ]

    jest
      .spyOn(fileUploadService, 'createReadStream')
      .mockReturnValue('' as any)
    jest.spyOn(fileUploadService, 'streamToString').mockResolvedValue('')
    jest
      .spyOn(fileUploadService, 'mapStringToFields')
      .mockReturnValue(rowList)
    jest
      .spyOn(fileUploadService, 'getSortedUsers')
      .mockReturnValue(sortedUsersList)
    jest
      .spyOn(fileUploadService, 'getSortedOrders')
      .mockReturnValue(sortedOrdersList)
    jest.spyOn(userService, 'save').mockResolvedValue(undefined)
    jest
      .spyOn(userService, 'findByExternalId')
      .mockResolvedValue(mockUserEntity())
    jest.spyOn(orderService, 'save').mockResolvedValue(undefined)
    jest
      .spyOn(orderService, 'findByExternalId')
      .mockResolvedValue(mockOrderEntity())
    jest
      .spyOn(productService, 'save')
      .mockResolvedValue(mockProductEntity())
    jest
      .spyOn(fileUploadService, 'formatResponse')
      .mockReturnValue({} as any)

    const result = await sut.uploadFile({ path: 'any-value' } as any)

    expect(result).toEqual({})
  })
})
