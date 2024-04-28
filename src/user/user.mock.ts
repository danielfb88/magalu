import { User } from './user.entity'

export const mockUserEntity = (): User => {
  return {
    id: 'any-id',
    name: 'any-name',
    externalId: 1,
    orders: new Promise((resolve) => {
      resolve([])
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
