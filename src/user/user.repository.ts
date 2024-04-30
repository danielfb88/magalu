import { Inject, Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UserRepository {
  private baseRepository: Repository<User>

  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.baseRepository = dataSource.getRepository(User)
  }

  async findAll(): Promise<User[]> {
    return this.baseRepository.find()
  }

  async save(dto: CreateUserDto): Promise<User> {
    try {
      const prepared = this.baseRepository.create({
        externalId: dto.id,
        name: dto.name,
      })

      const saved = await this.baseRepository.save(prepared)

      return saved
    } catch (error) {
      console.log(error)
      // throw error
    }
  }

  async findByExternalId(externalId: number): Promise<User> {
    return this.baseRepository.findOne({
      where: {
        externalId,
      },
    })
  }
}
