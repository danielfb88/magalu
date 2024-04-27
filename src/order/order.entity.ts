import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Product, (product) => product.order)
  products: Promise<Product[]>

  @Column()
  orderDate: Date

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
