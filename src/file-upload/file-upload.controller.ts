import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('file-upload')
export class FileUploadController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    /* 
    TODO
    1 - ler o arquivo
    2 - persistir os dados
    3 - retornar o json
    4 - endpoints com filtros
    5 - readme
     */
  }
}
