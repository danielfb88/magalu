import { Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.findAll()
  }

  async save(dto: CreateUserDto): Promise<User> {
    const saved = await this.repository.save(dto)
    return saved
  }
}
