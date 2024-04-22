import { Injectable, UploadedFile } from '@nestjs/common'

@Injectable()
export class FileUploadService {
  constructor() {}

  async convertTxtFileToObject(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any[]> {
    console.log(file)
    return null
  }
}
