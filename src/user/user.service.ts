import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async save(dto: CreateUserDto): Promise<User> {
    try {
      const saved = this.userRepository.save({
        externalUserId: dto.id,
        name: dto.name,
      })

      return saved
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
