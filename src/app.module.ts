import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { DatabaseModule } from './database/database.module'
import { FileUploadController } from './file-upload/file-upload.controller'
import { FileUploadModule } from './file-upload/file-upload.module'
import { OrderController } from './order/order.controller'
import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    UserModule,
    OrderModule,
    ProductModule,
    DatabaseModule,
    FileUploadModule,
  ],
  controllers: [FileUploadController, OrderController],
  providers: [],
})
export class AppModule {}
