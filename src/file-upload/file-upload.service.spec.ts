import { Test, TestingModule } from '@nestjs/testing'
import { FileUploadService } from './file-upload.service'

describe('FileUploadService', () => {
  let sut: FileUploadService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadService],
    }).compile()

    sut = module.get<FileUploadService>(FileUploadService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
})
