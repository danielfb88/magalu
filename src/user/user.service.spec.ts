import { Test, TestingModule } from '@nestjs/testing'
import { mockUserEntity } from './user.mock'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'
import { userRepositoryStub } from './user.stub'

describe('UserService', () => {
  let sut: UserService
  let repository: UserRepository

  const entityMock = mockUserEntity()

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
    repository = module.get<UserRepository>('USER_REPOSITORY')
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should save successfuly and return the saved data', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(entityMock)

    const saved = await sut.save({
      id: entityMock.externalId,
      name: entityMock.name,
    })

    expect(saved).toEqual(entityMock)
  })

  it('should throw an exception if save throws', async () => {
    jest.spyOn(repository, 'save').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.save({
      id: entityMock.externalId,
      name: entityMock.name,
    })

    await expect(promise).rejects.toThrow(Error)
  })

  it('should find all successfuly', async () => {
    jest.spyOn(repository, 'findAll').mockResolvedValue([])
    const list = await sut.findAll()
    expect(list).toEqual([])
  })
})
