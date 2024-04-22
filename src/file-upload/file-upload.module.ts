import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { FileUploadController } from './file-upload.controller'
import { FileUploadService } from './file-upload.service'

@Module({
  imports: [UserModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
