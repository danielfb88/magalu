import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as fs from 'fs'
import { FileUploadService } from './file-upload.service'

@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path, 'utf8')
    const plainTxt = await this.fileUploadService.streamToString(stream)
    const list = this.fileUploadService.mapStringToFields(plainTxt)
    const userList = this.fileUploadService.getUsers(list)
    const orderList = this.fileUploadService.getOrdersByUser(list)

    // list.forEach((element) => {
    //   userList.forEach((user) => {
    //     if (element[0] === user[0]) {
    //       const obj: IFormattedOrder = {
    //         user_id: parseInt(user[0]),
    //         name: user[1],
    //       }

    //       orderList.forEach((order) => {
    //         if (element[2] === order) {
    //           obj.orders.push
    //         }
    //       })
    //     }
    //   })
    // })

    // userList.forEach((user) => {})

    console.log(orderList)
    /* 
    TODO
    2 - persistir os dados
    3 - retornar o json
    4 - endpoints com filtros
    5 - readme
     */
  }
}
