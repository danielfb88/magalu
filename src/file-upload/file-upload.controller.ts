import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as fs from 'fs'
import { UserService } from '../user/user.service'
import { FileUploadService } from './file-upload.service'

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService,
    private userService: UserService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path, 'utf8')
    const plainTxt = await this.fileUploadService.streamToString(stream)
    const list = this.fileUploadService.mapStringToFields(plainTxt)
    const sortedUserList = this.fileUploadService.getSortedUsers(list)

    sortedUserList.forEach(async (userData) => {
      if (!isNaN(userData.id)) {
        const saved = await this.userService.save({
          user_id: userData.id,
          name: userData.name,
        })
        console.log(saved)
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
