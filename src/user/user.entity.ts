import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { Order } from '../order/order.entity'

@Entity({ name: 'user' })
@Unique(['externalUserId'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  externalUserId: string

  @Column()
  name: string

  @OneToMany(() => Order, (order) => order.user)
  orders: Promise<Order[]>

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
