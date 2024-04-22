import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { FileUploadController } from './file-upload/file-upload.controller'
import { FileUploadModule } from './file-upload/file-upload.module'
import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    UserModule,
    OrderModule,
    ProductModule,
    DatabaseModule,
    FileUploadModule,
  ],
  controllers: [FileUploadController],
  providers: [],
})
export class AppModule {}
