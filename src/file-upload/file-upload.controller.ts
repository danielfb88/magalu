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
import { IOrderDomain } from '../shared/interface/order.domain.interface'
import { IUserDomain } from '../shared/interface/user.domain.interface'
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

    const rowList = this.fileUploadService.mapStringToFields(plainTxt)

    const sortedUserList = this.fileUploadService.getSortedUsers(rowList)
    const sortedOrderList = this.fileUploadService.getSortedOrders(rowList)

    const savedUserList: IUserDomain[] = []
    const savedOrderList: IOrderDomain[] = []
    // const savedProductList: IProductDomain[] = [] // TODO não buscar no banco

    for (const user of sortedUserList) {
      if (user.id !== null && !isNaN(user.id)) {
        // Saving user
        const savedUser = await this.userService.save({
          id: user.id,
          name: user.name,
        })
        savedUserList.push(savedUser)

        for (const order of sortedOrderList) {
          if (user.id === order.userId) {
            // Saving order
            const savedOrder = await this.orderService.save({
              id: order.orderId,
              userId: savedUser.id,
              date: this.fileUploadService.getDateFromString(order.date),
            })
            savedOrderList.push(savedOrder)
          }
        }
      }
    }

    for (const row of rowList) {
      const order = savedOrderList.find(
        (o) => o.externalId === parseInt(row.orderId),
      )

      if (order) {
        // Saving product
        // const savedProduct = await this.productService.save({
        await this.productService.save({
          id: parseInt(row.prodId),
          orderId: order.id,
          value: parseFloat(row.value),
        })
      } else {
        console.log(`ORDER ${parseInt(row.orderId)} NOT FOUND`)
      }
    }

    const resultList = []

    // Returning Json
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
  }
}
