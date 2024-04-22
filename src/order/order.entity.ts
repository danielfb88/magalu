import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { Product } from '../product/product.entity'
import { User } from '../user/user.entity'

@Entity({ name: 'order' })
@Unique(['externalId'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  externalId: number

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
  })
  user: User

  @ManyToMany(() => Product)
  products: Promise<Product[]>

  @Column()
  orderDate: Date

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
