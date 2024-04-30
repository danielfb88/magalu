import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { OrderService } from '../order/order.service'
import { ProductService } from '../product/product.service'
import { IOrderDomain } from '../shared/interface/order.domain.interface'
import { IProductDomain } from '../shared/interface/product.domain.interface'
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
    const stream = this.fileUploadService.createReadStream(file.path)
    const plainTxt = await this.fileUploadService.streamToString(stream)

    const rowList = this.fileUploadService.mapStringToFields(plainTxt)

    const sortedUserList = this.fileUploadService.getSortedUsers(rowList)
    const sortedOrderList = this.fileUploadService.getSortedOrders(rowList)

    const savedUserList: IUserDomain[] = []
    const savedOrderList: IOrderDomain[] = []
    const savedProductList: IProductDomain[] = []

    for (const user of sortedUserList) {
      if (user.id !== null && !isNaN(user.id)) {
        // Saving user
        let savedUser = await this.userService.save({
          id: user.id,
          name: user.name,
        })
        if (savedUser) {
          savedUserList.push(savedUser)
        } else {
          savedUser = await this.userService.findByExternalId(user.id)
          if (savedUser) {
            savedUserList.push(savedUser)
          }
        }

        for (const order of sortedOrderList) {
          if (user.id === order.userId) {
            // Saving order
            let savedOrder = await this.orderService.save({
              id: order.orderId,
              userId: savedUser.id,
              date: this.fileUploadService.getDateFromString(order.date),
            })
            if (savedOrder) {
              savedOrderList.push(savedOrder)
            } else {
              savedOrder = await this.orderService.findByExternalId(
                order.orderId,
              )
              if (savedOrder) {
                savedOrderList.push(savedOrder)
              }
            }
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
        const savedProduct = await this.productService.save({
          id: parseInt(row.prodId),
          orderId: order.id,
          value: parseFloat(row.value),
        })
        savedProductList.push(savedProduct)
      }
    }

    const responseList = this.fileUploadService.formatResponse(
      savedUserList,
      savedOrderList,
      savedProductList,
    )

    return responseList
  }
}
