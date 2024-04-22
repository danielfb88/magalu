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
@Unique(['externalId'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  externalId: number

  @Column()
  name: string

  @OneToMany(() => Order, (order) => order.user)
  orders: Promise<Order[]>

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
