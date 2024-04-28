import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { userRepositoryStub } from './user.stub'

describe('UserService', () => {
  let sut: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USER_REPOSITORY',
          useFactory: userRepositoryStub,
        },
      ],
    }).compile()

    sut = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
})
