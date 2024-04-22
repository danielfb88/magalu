import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
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

    sortedUserList.forEach(async (userData) => {
      if (userData.id !== null && !isNaN(userData.id)) {
        const savedUser = await this.userService.save({
          id: userData.id,
          name: userData.name,
        })
        console.log(savedUser)

        sortedOrderList.forEach(async (order) => {
          if (userData.id === order.userId) {
            const savedOrder = await this.orderService.save({
              id: order.orderId,
              userId: savedUser.id,
              date: this.fileUploadService.getDateFromString(order.date),
            })

            console.log(savedOrder)

            list.forEach(async (item) => {
              if (order.orderId === parseInt(item[2])) {
                const prodId = parseInt(item[3])
                const prodValue = parseFloat(item[4])

                const savedProduct = await this.productService.save({
                  id: prodId,
                  orderId: savedOrder.id,
                  value: prodValue,
                })

                console.log(savedProduct)
              }
            })
          }
        })
      }
    })

    console.log(sortedUserList)
    /* 
    TODO
    2 - persistir os produtos
    3 - retornar o json
    4 - endpoints com filtros
    5 - readme
     */
  }
}
