import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find()
  }

  async save(dto: CreateUserDto): Promise<User> {
    try {
      const prepared = this.repository.create({
        externalId: dto.id,
        name: dto.name,
      })

      const saved = await this.repository.save(prepared)

      return saved
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
