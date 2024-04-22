import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as fs from 'fs'
import { OrderService } from '../order/order.service'
import { UserService } from '../user/user.service'
import { FileUploadService } from './file-upload.service'

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService,
    private userService: UserService,
    private orderService: OrderService,
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

        list.forEach(async (element) => {
          if (userData.id === parseInt(element[0])) {
            const date = this.fileUploadService.getDateFromString(
              element[5],
            )

            // const savedOrder = await this.orderService.save({
            //   id: parseInt(element[0]),
            //   date,
            //   userId: savedUser.id,
            // })

            // console.log(savedOrder)
          }
        })
      }
    })

    console.log(sortedUserList)
    /* 
    TODO
    2 - persistir os dados
    3 - retornar o json
    4 - endpoints com filtros
    5 - readme
     */
  }
}
