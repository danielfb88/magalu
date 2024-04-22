import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { format } from 'date-fns'
import * as fs from 'fs'
import { OrderService } from '../order/order.service'
import { ProductService } from '../product/product.service'
import { UserService } from '../user/user.service'
import { FileUploadService } from './file-upload.service'

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService,
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path, 'utf8')
    const plainTxt = await this.fileUploadService.streamToString(stream)
    const list = this.fileUploadService.mapStringToFields(plainTxt)
    const sortedUserList = this.fileUploadService.getSortedUsers(list)
    const sortedOrderList = this.fileUploadService.getSortedOrders(list)

    const savedUserList: any[] = []
    const savedOrderList: any[] = []
    const savedProductList: any[] = []

    for (const userData of sortedUserList) {
      if (userData.id !== null && !isNaN(userData.id)) {
        const savedUser = await this.userService.save({
          id: userData.id,
          name: userData.name,
        })
        savedUserList.push(savedUser)
        console.log(savedUser)

        for (const order of sortedOrderList) {
          if (userData.id === order.userId) {
            const savedOrder = await this.orderService.save({
              id: order.orderId,
              userId: savedUser.id,
              date: this.fileUploadService.getDateFromString(order.date),
            })
            savedOrderList.push(savedOrder)
            console.log(savedOrder)
          }
        }
      }
    }

    console.log(sortedUserList)

    for (const item of list) {
      const foundOrder = savedOrderList.find(
        (savedOrder) => savedOrder.externalId === parseInt(item[2]),
      )

      if (foundOrder) {
        const prodId = parseInt(item[3])
        const prodValue = parseFloat(item[4])

        const savedProduct = await this.productService.save({
          id: prodId,
          orderId: foundOrder.id,
          value: prodValue,
        })
        savedProductList.push(savedProduct)
        console.log(savedProduct)
      } else {
        console.log(`ORDER ${parseInt(item[2])} NOT FOUND`)
      }
    }

    const resultList = []

    for (const user of savedUserList) {
      const filtredOrders = savedOrderList.filter(
        (order) => order.user.id === user.id,
      )

      const mappedOrders = []
      for (const order of filtredOrders) {
        let total = 0
        const products = await this.productService.findByOrder(order.id)

        for (const product of products) {
          total += product.value
        }

        mappedOrders.push({
          order_id: order.externalId,
          total,
          date: format(order.orderDate, 'yyyy-MM-dd'),
          products: products.map((product) => {
            return {
              product_id: product.externalId,
              value: product.value,
            }
          }),
        })
      }

      resultList.push({
        user_id: user.externalId,
        name: user.name,
        orders: mappedOrders,
      })
    }

    return resultList
    /* 
    TODO
    4 - endpoints com filtros
    5 - readme
     */
  }
}
