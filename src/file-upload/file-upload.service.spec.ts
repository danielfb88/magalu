import { Test, TestingModule } from '@nestjs/testing'
import * as fs from 'fs'
import { mockOrderEntity } from '../order/order.mock'
import { mockProductEntity } from '../product/product.mock'
import { mockUserEntity } from '../user/user.mock'
import { FileUploadService } from './file-upload.service'

const fsMocked = jest.mocked(fs)

describe('FileUploadService', () => {
  let sut: FileUploadService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadService],
    }).compile()

    sut = module.get<FileUploadService>(FileUploadService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute createReadStream and create an stream', () => {
    jest
      .spyOn(fsMocked, 'createReadStream')
      .mockImplementation(() => '' as any)

    sut.createReadStream('')
    expect(fsMocked.createReadStream).toHaveBeenCalledTimes(1)
  })

  it('should execute getDateFromString and return result', () => {
    const value = sut.getDateFromString('19880208')
    expect(value).toEqual(
      new Date(parseInt('1988'), parseInt('2') - 1, parseInt('08')),
    )
  })

  it('should execute mapStringToFields and return result', () => {
    const value = sut.mapStringToFields(
      '0000000077                         Mrs. Stephen Trantow00000008440000000005     1288.7720211127',
    )
    expect(value).toEqual([
      {
        userId: '0000000077',
        userName: 'Mrs. Stephen Trantow',
        orderId: '0000000844',
        prodId: '0000000005',
        value: '1288.77',
        date: '20211127',
      },
    ])
  })

  it('should execute getSortedUsers and sorted data', () => {
    const rowList = [
      {
        userId: '000000002',
        userName: 'Vegeta da Silva',
        orderId: '0000000844',
        prodId: '0000000005',
        value: '1288.77',
        date: '20211127',
      },
      {
        userId: '000000001',
        userName: 'Goku dos Santos',
        orderId: '0000000844',
        prodId: '0000000005',
        value: '1288.77',
        date: '20211127',
      },
    ]

    const value = sut.getSortedUsers(rowList)
    expect(value[0].name).toEqual('Goku dos Santos')
    expect(value[1].name).toEqual('Vegeta da Silva')
  })

  it('should execute getSortedOrders and sorted data', () => {
    const rowList = [
      {
        userId: '000000002',
        userName: 'Vegeta da Silva',
        orderId: '0000000001',
        prodId: '0000000005',
        value: '1288.77',
        date: '20211127',
      },
      {
        userId: '000000001',
        userName: 'Goku dos Santos',
        orderId: '0000000002',
        prodId: '0000000005',
        value: '1288.77',
        date: '20211127',
      },
    ]

    const value = sut.getSortedOrders(rowList)
    expect(value[0].orderId).toEqual(1)
    expect(value[1].orderId).toEqual(2)
  })

  it('should execute formatResponse and formatted', () => {
    const userList = [mockUserEntity()]
    const orderList = [mockOrderEntity()]
    const productList = [mockProductEntity()]

    const value = sut.formatResponse(userList, orderList, productList)
    expect(value[0].user_id).toEqual(1)
  })
})
